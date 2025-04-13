import Header from "@/layout/Header";
import { fetchAllBooks, resetBookSlice } from "@/store/slices/bookSlice";
import {
  fetchAllBorrowedBooks,
  resetBorrowSlice,
} from "@/store/slices/borrowSlics";
import { toggleaddBookPopup, togglereadBookPopup, togglerecordBookPopup } from "@/store/slices/popupSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BookA, NotebookPen } from "lucide-react";
import ReadBookPopup from "@/popups/ReadBookPopup";
import RecordBookPopup from "@/popups/RecordBookPopup";
import AddBookPopup from "@/popups/AddBookPopup";
export default function BookManagment() {
  const dispatch = useDispatch();
  const { loading, error, message, books } = useSelector((state) => state.book);
  const { isAuthencated, user } = useSelector((state) => state.auth);
  const { readBookPopup,recordBookPopup,addBookPopup } = useSelector((state) => state.popup);
  const {
    loading: borrowSliceLoading,
    error: borrowSliceError,
    message: borrowSliceMessage,
  } = useSelector((state) => state.borrow);

  const [readBook, setReadBook] = useState({});
  const openReadPopup = (id) => {
    const book = books.find((book) => book._id === id);
    setReadBook(book);
    dispatch(togglereadBookPopup());
  };
  const [borrowedBookId, setBorrowedBookId] = useState("");
  const openRecordBookPopup = (bookId) => {
    setBorrowedBookId(bookId);
    dispatch(togglerecordBookPopup());
  };
  useEffect(() => {
    if (message || borrowSliceMessage) {
      dispatch(fetchAllBooks());
      dispatch(fetchAllBorrowedBooks());
      dispatch(resetBookSlice());
      dispatch(resetBorrowSlice());
    }
  }, [
    message,
    error,
    loading,
    borrowSliceError,
    borrowSliceLoading,
    borrowSliceMessage,
  ]);
  const [search, setSearchKeyword] = useState("");
  const handleSearch = (e) => {
    setSearchKeyword(e.target.value.toLowerCase());
  };
  const searchBooks = books.filter((book) => 
    book.title.toLowerCase().includes(search)
  );
  if(books){
    console.log(books);
    console.log(searchBooks)
  }

  return (
    <>
      <main className="relative flex-1 p-6 pt-28">
        <Header />
        <header className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center">
          <h2 className="text-xl font-medium md:text-2xl md:font-semibold">
            {user && user.role === "Admin" ? "Book Managment" : "Books"}
          </h2>
          <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
            {isAuthencated && user.role === "Admin" && (
              <button
                onClick={() => dispatch(toggleaddBookPopup())}
                className="relative pl-14 w-full sm:w-52 flex gap-4 justify-center items-center py-2 px-4 bg-black text-white rounded-md hover:bg-gray-800"
              >
                <span className="bg-white flex justify-center items-center overflow-hidden rounded-full text-black w-[25px] h-[25px] text-[27px] absolute left-5">
                  +
                </span>
                Add Book
              </button>
            )}
            <input
              type="text"
              placeholder="Search Books...."
              className="w-full sm:w-52 border p-2 border-gray-300 rounded-md"
              onChange={handleSearch}
            />
          </div>
        </header>

        {books && books.length > 0 ? (
          <div className="mt-4 overflow-auto bg-white rounded-md shadow-lg">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 text-left">ID</th>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Author</th>
                  {isAuthencated && user?.role === "Admin" && (
                    <th className="px-4 py-2 text-left">Quantity</th>
                  )}
                  <th className="px-4 py-2 text-left">Price</th>
                  <th className="px-4 py-2 text-left">Availability</th>
                  {isAuthencated && user?.role === "Admin" && (
                    <th className="px-4 py-2 text-center">Record Book</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {searchBooks.map((book, index) => (
                  <tr
                    key={book._id}
                    className={(index + 1) % 2 === 0 ? "bg-gray-50" : ""}
                  >
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{book.title}</td>
                    <td className="px-4 py-2">{book.author}</td>
                    {isAuthencated && user?.role === "Admin" && (
                      <th className="px-4 py-2 text-left">{book.quantity}</th>
                    )}
                    <td className="px-4 py-2">{`$${book.price}`}</td>
                    <td className="px-4 py-2">{book.availability?"Available":"Unavailable"}</td>
                    {
                      isAuthencated && user?.role==="Admin" && (
                        <td className="px-4 py-2 flex space-x-2 my-3 justify-center">
                          <BookA onClick={()=>openReadPopup(book._id)}/>
                          <NotebookPen onClick={()=>openRecordBookPopup(book._id)}/>
                        </td>
                      )
                    }
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <h3 className="text-3xl mt-5 font-medium">No books found in library.</h3>
        )}
      </main>
      {addBookPopup && <AddBookPopup/>}
      {readBookPopup && <ReadBookPopup book={readBook}/>}
      {recordBookPopup && <RecordBookPopup bookId={borrowedBookId}/>}
    </>
  );
}
