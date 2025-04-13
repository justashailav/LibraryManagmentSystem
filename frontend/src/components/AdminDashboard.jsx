import React from "react";
import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement,
} from "chart.js";
import { useSelector } from "react-redux";
import Header from "@/layout/Header";
ChartJs.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement
);
import black_logo from "../assets/black-logo.png";
import userIcon from "../assets/people-black.png";
import blackIcon from "../assets/book-square.png";
export default function AdminDashboard() {
  const { user } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.user);
  const { books } = useSelector((state) => state.book);
  const { allBorrowedBooks } = useSelector((state) => state.borrow);

  const [totalUsers, setTotalUsers] = useState(0);
  const [totalAdmin, setTotalAdmin] = useState(0);
  const [totalBooks, setTotalBooks] = useState((books && books.length) || 0);
  const [totalBorrowedBooks, setTotalBorrowedBooks] = useState(0);
  const [totalReturnedBooks, setTotalReturnedBooks] = useState(0);

  useEffect(() => {
    let numberOfUsers = users.filter((user) => user.role === "User");
    let numberOfAdmins = users.filter((user) => user.role === "Admin");

    setTotalUsers(numberOfUsers.length);
    setTotalAdmin(numberOfAdmins);

    let numberofTotalBorrowedBooks = allBorrowedBooks.filter(
      (book) => book.returnDate === null
    );
    let numberofTotalReturnedBooks = allBorrowedBooks.filter(
      (book) => book.returnDate !== null
    );
    setTotalBorrowedBooks(numberofTotalBorrowedBooks.length);
    setTotalReturnedBooks(numberofTotalReturnedBooks.length);
  }, [users, allBorrowedBooks]);
  const data = {
    labels: ["Total Borrowed Books", "Total Returned Books"],
    datasets: [
      {
        data: [totalBorrowedBooks, totalReturnedBooks],
        backgroundColor: ["#3D3E3E", "#151619"],
        hoverOffset: 4,
      },
    ],
  };
  return (
    <>
      <main className="relative flex-1 p-6 pt-28">
      <Header />
      <div className="flex flex-col-reverse xl:flex-row">
        <div className="flex-[2] flex-col gap-7 lg:flex-row flex lg:items-center xl:flex-col justify-between xl:gap-20 py-5">
          <div className="xl:flex-[4] flex items-end w-full content-center">
            <Pie
              data={data}
              options={{ cutout: 0 }}
              className="mx-auto lg:mx-0 w-full h-auto"
            />
          </div>
          <div className="flex items-center p-8 w-full sm:w-[400px] xl:w-fit mr-5 xl:p-3 2xl:p-6 gap-5 h-fit xl:min-h-[150px] bg-white xl:flex-1 rounded-lg">
             <img src={black_logo} className="w-auto xl:flex-1 rounded-lg"/>
             <span className="w-[2px] bg-black h-full"></span>
             <div className="flex flex-col gap-3">
             <p className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-[#3D3E3E]"></span>
                <span>Total Borrowed Books</span>
              </p>
              <p className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-[#151619]"></span>
                <span>Total Returned Books</span>
              </p>
             </div>
          </div>
        </div>
        <div className="flex flex-[4] flex-col gap-7 lg:gap-16 lg:py-5 justify-between xl:min-h-[85.5vh]">
          <div className="flex flex-col-reverse lg:flex-row gap-7 flex-[4]">
            <div className="flex flex-col gap-7 flex-1">
            <div className="flex items-center gap-3 bg-white p-5 min-h-[120px] overflow-y-hidden rounded-lg transition hover:shadow-inner duration-300 w-full lg:max-w-[360px]">
              <span className="bg-gray-300 h-20 min-w-20 flex justify-center items-center rounded-lg">
                <img src={userIcon} className="w-8 h-8"/>
              </span>
              <span className="w-[2px] bg-black h-20 lg:h-full"></span>
              <div className="flex flex-col items-center gap-2">
                <h4 className="font-black text-3xl">{totalUsers}</h4>
                <p className="font-light text-gray-700 text-sm">Total User Base</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white p-5 min-h-[120px] overflow-y-hidden rounded-lg transition hover:shadow-inner duration-300 w-full lg:max-w-[360px]">
              <span className="bg-gray-300 h-20 min-w-20 flex justify-center items-center rounded-lg">
                <img src={blackIcon} className="w-8 h-8"/>
              </span>
              <span className="w-[2px] bg-black h-20 lg:h-full"></span>
              <div className="flex flex-col items-center gap-2">
                <h4 className="font-black text-3xl">{totalBooks}</h4>
                <p className="font-light text-gray-700 text-sm">Total Book Count</p>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    </>
  );
}
