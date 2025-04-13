import { returnBorrowBook } from "@/store/slices/borrowSlics";
import { togglereturnBookPopup } from "@/store/slices/popupSlice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

export default function ReturnBokkPopup({email,bookId}) {
  const dispatch = useDispatch();
  const handleReturnBook = (e) => {
    e.preventDefault();
    dispatch(returnBorrowBook(email, bookId));
    dispatch(togglereturnBookPopup());
  };
  return (
    <div className="fixed inset-0  bg-black/50  p-5 flex items-center justify-center z-50">
      <div className="w-11/12 bg-white rounded-lg shadow-lg sm:w-1/2 lg:w-1/3">
        <div className="p-6">
          <h3 className="text-xl font-bold mb-4">Return Book</h3>
          <form onSubmit={handleReturnBook}>
            <div className="mb-4">
              <label className="block text-gray-900 font-medium">
                User Email
              </label>
              <input
                type="email"
                defaultValue={email}
                placeholder="Borrower's Email"
                className="w-full px-4 py-2 border-2 border-black rounded-md"
                required
                disabled
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                type="button"
                onClick={() => dispatch(togglereturnBookPopup())}
              >
                Close
              </button>
              <button
                className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
                type="submit"
              >
                Return
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
