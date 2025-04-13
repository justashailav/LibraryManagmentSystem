import { resetAuthSlice, resetPassword } from '@/store/slices/authSlice';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate, useParams } from 'react-router-dom';
import logo from "../assets/logo-with-title.png";
import black_logo from "../assets/black-logo.png";
export default function ResetPassword() {
  const dispatch=useDispatch();
  const[password,setPassword]=useState("");
  const[confirmPassword,setConfirmPassword]=useState("");

  const{token}=useParams();
  const { loading, error, message, isAuthencated } = useSelector(
    (state) => state.auth
  );
  const handleResetPassword=(e)=>{
    e.preventDefault();
    const data=new FormData();
    data.append("password",password);
    data.append("confirmPassword",confirmPassword);
    dispatch(resetPassword(data,token))
  }
  useEffect(() => {
    // if (message) {
    //   navigateTo(`/otp-verification/${email}`);
    // }
    if (error) {
      dispatch(resetAuthSlice());
    }
  }, [dispatch, isAuthencated, error, loading]);
  if (isAuthencated) {
    return <Navigate to="/" />;
  }
  return (
    <div>
    <div className="flex flex-col justify-center md:flex-row h-screen">
      <div className="hidden w-full md:w-1/2 bg-black text-white md:flex flex-col items-center justify-center p-8 rounded-tr-[80px] rounded-br-[80px]">
        <div className="text-center h-[376px]">
          <div className="flex justify-center mb-12">
            <img src={logo} alt="logo" className="mb-12 h-44 w-auto" />
          </div>
          <h3 className="text-gray-300 mb-12 max-w-[320px] mx-auto text-3xl front-medium leading-10">
            Your premier digital library for borrowing and reading books.
          </h3>
        </div>
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8">
        <Link
          to="/password/forgot"
          className="border-2 border-black rounded-3xl font-bold w-52 py-2 px-4 fixed top-10 -left-28 hover:bg-black hover:text-white transition duration-300 text-end"
        >
          Back
        </Link>
        <div className="w-full max-w-sm">
          <div className="flex justify-center mb-12">
            <div className="rounded-full flex items-center justify-center">
              <img
                src={black_logo}
                alt="logo"
                className="h-auto w-24 object-cover"
              />
            </div>
          </div>
          <h1 className=" text-center  text-4xl font-medium mb-5 overflow-hidden">
            Reset Password
          </h1>
          <p className="text-gray-800 text-center mb-12">
            Please enter your new password
          </p>
          <form onSubmit={handleResetPassword}>
            <div className="mb-4">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border- rounded-md focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 border border- rounded-md focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="border-2 mt-5 border-black w-full font-semibold bg-black text-white py-2 rounded-lg hover:bg-white hover:text-black transition"
              disabled={loading?true:false}
            >
              RESET PASSWORD
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
  )
}
