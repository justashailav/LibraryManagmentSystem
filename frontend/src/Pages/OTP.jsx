import { otpVerification, resetAuthSlice } from "@/store/slices/authSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useParams } from "react-router-dom";
import black_logo from "../assets/black-logo.png";
import logo from "../assets/logo-with-title.png";
export default function OTP() {
  const { email } = useParams();
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();

  const { loading, error, message, isAuthencated } = useSelector(
    (state) => state.auth
  );
  const handleotpVerification = (e) => {
    e.preventDefault();
    dispatch(otpVerification(email, otp));
  };
  useEffect(() => {
    if (message) {
      console.log(message);
    }
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
        <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8 relative">
          <Link
            to="/register"
            className="border-2 border-black rounded-3xl font-bold w-52 py-2 px-4 fixed top-10 -left-28 hover:bg-black hover:text-white transition duration-300 text-end"
          >
            Back
          </Link>
          <div className="max-w-sm w-full">
            <div className="flex justify-center mb-12">
              <div className="rounded-full flex items-center justify-center">
                <img src={black_logo} alt="logo" className="h-24 w-auto" />
              </div>
            </div>
            <h1 className="text-4xl font-medium text-center mb-12 overflow-hidden">
              Check your Mailbox
            </h1>
            <p className="text-gray-800 text-center mb-12">
              Please enter the otp to proceed
            </p>
            <form onSubmit={handleotpVerification}>
              <div className="mb-4">
                <input
                  type="number"
                  placeholder="OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-4 py-3 border border- rounded-md focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="border-2 mt-5 border-black w-full font-semibold bg-black text-white py-2 rounded-lg hover:bg-white hover:text-black transition"
              >
                VERIFY
              </button>
            </form>
          </div>
        </div>
        <div className="hidden w-full md:w-1/2 bg-black text-white md:flex flex-col items-center justify-center p-8 rounded-tl-[80px] rounded-bl-[80px]">
            <div className="text-center h-[400px]">
                <div className="flex justify-center mb-12">
                    <img src={logo} alt="logo" className="mb-12 h-44 w-auto"/>
                </div>
                <p className="text-gray-300 mb-12">New to our platform ? Sign up now.</p>
                <Link to="/register"  className="border-2 mt-5 border-white px-8 w-full font-semibold bg-black text-white py-2 rounded-lg hover:bg-black hover:text-white transition">
                    SIGN UP
                </Link>
            </div> 
        </div>
      </div>
    </div>
  );
}
