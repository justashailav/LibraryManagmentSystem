import { addBook, fetchAllBooks } from "@/store/slices/bookSlice";
import { toggleaddBookPopup } from "@/store/slices/popupSlice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

export default function AddBookPopup() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();

  const handleAddBook = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", title);
    data.append("author", author);
    data.append("price", price);
    data.append("quantity", quantity);
    data.append("description", description);

    dispatch(addBook(data));
    dispatch(fetchAllBooks());
  };
  return (
    <div className="fixed inset-0  bg-black/50  p-5 flex items-center justify-center z-50">
      <div className="w-11/12 bg-white rounded-lg shadow-lg sm:w-1/2 lg:w-1/3">
        <div className="p-6">
          <h3 className="text-xl font-bold mb-4">Add Books</h3>
          <form onSubmit={handleAddBook}>
            <div className="mb-4">
              <label className="block text-gray-900 font-medium">
                Book Title
              </label>
              <input
                type="text"
                value={title}
                placeholder="Book Title"
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border-2 border-black rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-900 font-medium">
                Author
              </label>
              <input
                type="text"
                value={author}
                placeholder="Book Author"
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-4 py-2 border-2 border-black rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-900 font-medium">
                Book Price (Price for borrowing)
              </label>
              <input
                type="number"
                value={price}
                placeholder="Book Price"
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-4 py-2 border-2 border-black rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-900 font-medium">
                Quantity
              </label>
              <input
                type="number"
                value={quantity}
                placeholder="Book Quantity"
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full px-4 py-2 border-2 border-black rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-900 font-medium">
                Description
              </label>
              <textarea
                type="text"
                value={description}
                placeholder="Book Description"
                rows={4}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 border-2 border-black rounded-md"
                required
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                type="button"
                onClick={() => dispatch(toggleaddBookPopup())}
              >
                Close
              </button>
              <button
                className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
                type="submit"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
