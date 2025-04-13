import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Register from './Pages/Register'
import Login from './Pages/Login'
import OTP from './Pages/OTP'
import ForgotPassword from './Pages/ForgotPassword'
import ResetPassword from './Pages/ResetPassword'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from './store/slices/authSlice'
import { fetchAllUsers } from './store/slices/userSlice'
import { fetchAllBooks } from './store/slices/bookSlice'
import { fetchAllBorrowedBooks, fetchUserBorrowedBooks } from './store/slices/borrowSlics'
function App() {
  const {isAuthencated,user}=useSelector((state)=>state.auth);
  const dispatch=useDispatch();
  // useEffect(()=>{
  //   dispatch(getUser());

  //   if(isAuthencated && user?.role==="Admin"){
  //     console.log("LOGGED IN USER IS ADMIN")
  //     dispatch(fetchAllUsers())
  //   }
  // },[])
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
  useEffect(() => {
   dispatch(fetchAllBooks())
  }, [dispatch]);
  
  useEffect(() => {
    if (isAuthencated && user?.role === "Admin") {
      console.log("LOGGED IN USER IS ADMIN");
      dispatch(fetchAllUsers());
      dispatch(fetchAllBorrowedBooks())
    }
  }, [isAuthencated, user, dispatch]);
  useEffect(() => {
    if (isAuthencated && user?.role === "User") {
      console.log("LOGGED IN USER IS User");
      dispatch(fetchUserBorrowedBooks());
    }
  }, [isAuthencated, user, dispatch]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/otp-verification/:email" element={<OTP/>}/>
        <Route path="/password/forgot" element={<ForgotPassword/>}/>
        <Route path="/password/reset/:token" element={<ResetPassword/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
