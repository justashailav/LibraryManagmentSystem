import Sidebar from "@/layout/Sidebar";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import UserDashboard from "@/components/UserDashboard";
import AdminDashboard from "@/components/AdminDashboard";
import BookManagment from "@/components/BookManagment";
import Catalog from "@/components/Catalog";
import Users from "@/components/Users";
import MyBorrowedBooks from "@/components/MyBorrowedBooks";
export default function Home() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const { user, isAuthencated } = useSelector((state) => state.auth);
  const [selectedComponent, setSelectedComponent] = useState("");
  if(!isAuthencated){
    return <Navigate to="/login"/>
  }
  return (
    <div>
      <div className="relative md:pl-64 flex min-h-screen bg-gray-100">
        <div className="md:hidden z-10 absolute right-6 top-4 sm:top-6 flex justify-enter items-center bg-black rounded-md h-9 w-9 text-white">
          <GiHamburgerMenu
            className="text-2xl"
            onClick={() => setIsSideBarOpen(!isSideBarOpen)}
          />
        </div>
        <Sidebar
          isSideBarOpen={isSideBarOpen}
          setIsSideBarOpen={setIsSideBarOpen}
          setSelectedComponent={setSelectedComponent}
        />
        {/* {(() => {
          switch (selectedComponent) {
            case "Dashboard":
              return user?.role === "User" ? (
                <UserDashboard />
              ) : (
                <AdminDashboard />
              );
              break;
            case "Books":
              return <BookManagment />;
              break;
            case "Catalog":
              if (user.role === "Admin") {
                return <Catalog />;
              }
              break;
            case "Users":
              if (user?.role === "Admin") {
                return <Users />;
              }
              break;
            case "My Borrowed Books":
              return <MyBorrowedBooks />;
              break;
            default:
              return user?.role === "User" ? (
                <UserDashboard />
              ) : (
                <AdminDashboard />
              );
              break;
          }
        })} */}
        {(() => {
          switch (selectedComponent) {
            case "Dashboard":
              return user?.role === "User" ? (
                <UserDashboard />
              ) : (
                <AdminDashboard />
              );
            case "Books":
              return <BookManagment />;
            case "Catalog":
              return user?.role === "Admin" ? <Catalog /> : null;
            case "Users":
              return user?.role === "Admin" ? <Users /> : null;
            case "My Borrowed Books":
              return <MyBorrowedBooks />;
            default:
              return user?.role === "User" ? (
                <UserDashboard />
              ) : (
                <AdminDashboard />
              );
          }
        })()}
      </div>
    </div>
  );
}
