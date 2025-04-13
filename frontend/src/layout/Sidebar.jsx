import React, { useEffect } from "react";
import logo from "../assets/logo-with-title.png";
import dashboard from "../assets/element.png";
import book from "../assets/book.png";
import catalog from "../assets/catalog.png";
import userIcon from "../assets/people.png"
import settings from "../assets/setting-white.png"
import logoutIcon from "../assets/logout.png"
import closeIcon from "../assets/white-close-icon.png"
import { useDispatch, useSelector } from "react-redux";
import { logout, resetAuthSlice } from "@/store/slices/authSlice";

import {RiAdminFill} from "react-icons/ri"
export default function Sidebar({
  isSideBarOpen,
  setIsSideBarOpen,
  setSelectedComponent,
}) {
  const dispatch = useDispatch();
  const { loading, error,user, message, isAuthencated } = useSelector(
    (state) => state.auth
  );
  const handlelogout = () => {
    dispatch(logout());
  };
  useEffect(() => {
    if (error) {
      dispatch(resetAuthSlice());
    }
    if (message) {
      dispatch(resetAuthSlice());
    }
  }, [dispatch, error, isAuthencated, loading, message,user]);
  return (
    <>
      <aside
        className={`${
          isSideBarOpen ? "left-0" : "-left-full"
        } z-10 transition-all duration-700 md:relative md:left-0 flex w-64 bg-black text-white flex-col h-full`}
        style={{ position: "fixed" }}
      >
        <div className="px-6 py-8 my-8">
          <img src={logo} />
        </div>
        <nav className="flex-1 px-6 space-y-2">
          <button
            className="w-full py-2 font-medium bg-transparent rounded-md flex items-center space-x-2 hover:cursor-pointer"
            onClick={() => setSelectedComponent("Dashboard")}
          >
            <img src={dashboard} />
            <span>Dashboard</span>
          </button>
          <button
            className="w-full py-2 font-medium bg-transparent rounded-md flex items-center space-x-2 hover:cursor-pointer"
            onClick={() => setSelectedComponent("Books")}
          >
            <img src={book} />
            <span>Books</span>
          </button>
          {isAuthencated && user?.role === "Admin" && (
            <>
            <button
              className="w-full py-2 font-medium bg-transparent rounded-md flex items-center space-x-2 hover:cursor-pointer"
              onClick={() => setSelectedComponent("Catalog")}
            >
              <img src={catalog} />
              <span>Catalog</span>
            </button>
            <button
              className="w-full py-2 font-medium bg-transparent rounded-md flex items-center space-x-2 hover:cursor-pointer"
              onClick={() => setSelectedComponent("Users")}
            >
              <img src={userIcon} />
              <span>Users</span>
            </button>

           
            </>
          )}
          {isAuthencated && user?.role === "User" &&(
            <>
            <button
              className="w-full py-2 font-medium bg-transparent rounded-md flex items-center space-x-2 hover:cursor-pointer"
              onClick={() => setSelectedComponent("My Borrowed Books")}
            >
              <img src={catalog} />
              <span>My Borrowed Books</span>
            </button>
            </>
          )}
          <button
            // onClick={() => dispatch(toggleSettingPopup())}
            className="w-full py-2 font-medium bg-transparent rounded-md hover:cursor-pointer flex items-center space-x-2"
          >
            <img src={settings} alt="setting" />{" "}
            <span>Update Credentials</span>
          </button>
        </nav>
        <div className="px-6 py-4">
          <button
            className="py-2 font-medium text-center bg-transparent rounded-md hover:cursor-pointer flex items-center justify-center space-x-5 mb-7 mx-auto w-fit"
            onClick={handlelogout}
          >
            <img src={logoutIcon} alt="logout" /> <span>Log Out</span>
          </button>
        </div>
        <img
          src={closeIcon}
          alt="closeIcon"
          onClick={() => setIsSideBarOpen(!isSideBarOpen)}
          className="h-fit w-fit absolute top-0 right-4 mt-4 block md:hidden"
        />
      </aside>
    </>
  );
}
