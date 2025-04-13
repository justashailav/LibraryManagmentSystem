import Header from '@/layout/Header';
import { resetPassword } from '@/store/slices/authSlice';
import { fetchAllBooks, resetBookSlice } from '@/store/slices/bookSlice';
import { fetchAllBorrowedBooks } from '@/store/slices/borrowSlics';
import { togglereturnBookPopup } from '@/store/slices/popupSlice';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PiKeyReturnBold } from "react-icons/pi";
import { FaSquareCheck } from "react-icons/fa6";
import ReturnBokkPopup from '@/popups/ReturnBokkPopup';
export default function Catalog() {
  const{returnBookPopup}=useSelector((state)=>state.popup);
  const{loading,error,allBorrowedBooks,message}=useSelector((state)=>state.borrow);
  const{user}=useSelector((state)=>state.auth)
  const dispatch=useDispatch();
  const[filter,setFilter]=useState("borrowed");
  const formatDateAndTime = (timeStamp) => {
    const date = new Date(timeStamp);
    const formatDate = `${String(date.getDate()).padStart(2, "0")}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(date.getFullYear())}`;
    const formatTime = `${String(date.getHours()).padStart(2, "0")}:${String(
      date.getMinutes()
    ).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;
    const result = `${formatDate} ${formatTime}`;
    return result;
  };
  const formatDate = (timeStamp) => {
    const date = new Date(timeStamp);
    const formatDate = `${String(date.getDate()).padStart(2, "0")}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(date.getFullYear())}`;
    return formatDate;
  };
  const currDate=new Date();

  const borrowedBooks=allBorrowedBooks?.filter((book)=>{
    const dueDate=new Date(book.dueDate);
    return dueDate>currDate
  })
  const overDueBooks=allBorrowedBooks?.filter((book)=>{
    const dueDate=new Date(book.dueDate);
    return dueDate<=currDate
  })
  const booksToDisplay=filter=="borrowed"?borrowedBooks:overDueBooks;
  const[email,setEmail]=useState("");
  const[borrowedBookId,setBorrowedBookId]=useState("");
  const openReturnBookPopup=(bookId,email)=>{
    setBorrowedBookId(bookId);
    setEmail(email);
    dispatch(togglereturnBookPopup())
  }
  useEffect(()=>{
    if(message){
      dispatch(fetchAllBooks());
      dispatch(fetchAllBorrowedBooks())
      dispatch(resetBookSlice());
      dispatch(resetPassword());
    }
  },[dispatch,error,loading])
  return (
    <>
      <main className="relative flex-1 p-6 pt-28">
        <Header/>
        <header className="flex flex-col gap-3 sm:flex-row md:items-center">
          <button className={`relative rounded sm:rounded-tr-none sm:rounded-br-none sm:rounded-tl-lg sm:rounded-bl-lg text-center border-2 font-semibold py-2 w-full sm:w-72 ${filter==="borrowed"?"bg-black text-white border-black":"bg-gray-200 text-black border-gray-200 hover:bg-gray-300"}`} onClick={()=>setFilter("borrowed")}>
            Borrowed Books
          </button>
           <button className={`relative rounded sm:rounded-tl-none sm:rounded-bl-none sm:rounded-br-lg sm:rounded-tr-lg text-center border-2 font-semibold py-2 w-full sm:w-72 ${filter==="overDue"?"bg-black text-white border-black":"bg-gray-200 text-black border-gray-200 hover:bg-gray-300"}`} onClick={()=>setFilter("overDue")}>
            OverDue Borrowers
          </button>
        </header>

        {
          booksToDisplay && booksToDisplay.length>0 ?(
            <div className="mt-4 overflow-auto bg-white rounded-md shadow-lg">
              <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 text-left">ID</th>
                  <th className="px-4 py-2 text-left">UserName</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Price</th>
                  <th className="px-4 py-2 text-left">Due Date</th>
                  <th className="px-4 py-2 text-left">Date & Time</th>
                  
                  <th className="px-4 py-2 text-left">Return</th>
                </tr>
              </thead>
              <tbody>
                {booksToDisplay.map((book, index) => (
                  <tr
                    key={book._id}
                    className={(index + 1) % 2 === 0 ? "bg-gray-50" : ""}
                  >
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{book?.user.name}</td>
                    <td className="px-4 py-2">{book?.user.email}</td>
                    <td className="px-4 py-2">{book.price}</td>
                    <td className="px-4 py-2">{formatDate(book.dueDate)}</td>
                    <td className="px-4 py-2">{formatDateAndTime(book.createdAt)}</td>
                    <td className="px-4 py-2">
                      {
                        book.returnDate?(
                          <FaSquareCheck className='w-6 h-6'/>
                        ):(
                          <PiKeyReturnBold onClick={()=>openReturnBookPopup(book.book,book?.user.email)}/>
                        )
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
              </table>
            </div>
          ):filter==="borrowed"?(
            <h3 className="text-3xl mt-5 font-medium">No borrowed books found!</h3>
          ):(
            <h3 className="text-3xl mt-5 font-medium">No overDueBooks books found!</h3>
          )
        }
      </main>
      {returnBookPopup && <ReturnBokkPopup bookId={borrowedBookId} email={email}/>}
    </>
  )
}
