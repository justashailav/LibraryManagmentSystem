import { createSlice } from "@reduxjs/toolkit";
import axios from "axios"
const borrowSlice=createSlice({
    name:"borrow",
    initialState:{
        loading:false,
        error:null,
        message:null,
        userBorrowedBooks:[],
        allBorrowedBooks:[]
    },
    reducers:{
        fetchUserBorrowedBooksRequest(state){
            (state.loading = true), (state.error = null), (state.message = null);
        },
        fetchUserBorrowedBooksRequestSuccess(state,action){
            (state.loading = true),
            (state.userBorrowedBooks = action.payload);
        },
        fetchUserBorrowedBooksRequestFailed(state,action){
           state.loading=false,
           state.error = null
        },
        recordBookRequest(state){
            (state.loading = true), (state.error = null), (state.message = null);
        },
        recordBookRequestSuccess(state,action){
            state.loading=false,
            state.message=action.payload
        },
        recordBookRequestSuccessFailed(state,action){
            state.loading=false,
            state.error = action.payload,
            state.message=null
        },
        fetchAllBorrowedBooksRequest(state){
            (state.loading = true), (state.error = null), (state.message = null);
        },
        fetchAllBorrowedBooksRequestSuccess(state,action){
            (state.loading = true),
            (state.allBorrowedBooks = action.payload);
        },
        fetchAllBorrowedBooksRequestFailed(state,action){
           state.loading=false,
           state.error = null
        },
        returnBookRequest(state){
            (state.loading = true), (state.error = null), (state.message = null);
        },
        returnBookRequestSuccess(state,action){
            state.loading=false,
            state.message=action.payload
        },
        returnBookRequestSuccessFailed(state,action){
            state.loading=false,
            state.error = action.payload,
            state.message=null
        },
        resetBorrowSlice(state){
            state.loading=false,
            state.error=null,
            state.message=null
        }
    }
})

export const fetchUserBorrowedBooks = () => async (dispatch) => {
    dispatch(borrowSlice.actions.fetchUserBorrowedBooksRequest());
    await axios.get("library-managment-system-backend.vercel.app/my-borrowed-books", {
      withCredentials: true,
    })
      .then((res) => {
        dispatch(borrowSlice.actions.fetchUserBorrowedBooksRequestSuccess(res.data.borrowedBooks));
      })
      .catch((error) => {
        dispatch(
          borrowSlice.actions.fetchUserBorrowedBooksRequestFailed(error.response.data.message)
        );
      });
};

export const fetchAllBorrowedBooks = () => async (dispatch) => {
    dispatch(borrowSlice.actions.fetchAllBorrowedBooksRequest());
    await axios.get("library-managment-system-backend.vercel.app/borrowed-books-by-users", {
      withCredentials: true,
    })
      .then((res) => {
        dispatch(borrowSlice.actions.fetchAllBorrowedBooksRequestSuccess(res.data.borrowedBooks));
      })
      .catch((error) => {
        dispatch(
          borrowSlice.actions.fetchAllBorrowedBooksRequestFailed(error.response.data.message)
        );
      });
};
export const recordBorrowBook = (email,id) => async (dispatch) => {
    dispatch(borrowSlice.actions.recordBookRequest());
    await axios.post(`library-managment-system-backend.vercel.app/record-borrow-book/${id}`,{email}, {
      withCredentials: true,
      headers:{
        "Content-Type":"application/json"
      }
    })
      .then((res) => {
        dispatch(borrowSlice.actions.recordBookRequestSuccess(res.data.message));
      })
      .catch((error) => {
        dispatch(
          borrowSlice.actions.recordBookRequestSuccessFailed(error.response.data.message)
        );
      });
  };
  export const returnBorrowBook = (email,id) => async (dispatch) => {
    dispatch(borrowSlice.actions.returnBookRequest());
    await axios.put(`library-managment-system-backend.vercel.app/return-borrow-book/${id}`,{email}, {
      withCredentials: true,
      headers:{
        "Content-Type":"application/json"
      }
    })
      .then((res) => {
        dispatch(borrowSlice.actions.returnBookRequestSuccess(res.data.message));
      })
      .catch((error) => {
        dispatch(
          borrowSlice.actions.returnBookRequestSuccessFailed(error.response.data.message)
        );
      });
  };
  export const resetBorrowSlice=()=>(dispatch)=>{
        dispatch(borrowSlice.actions.resetBorrowSlice())
    }
export default borrowSlice.reducer
