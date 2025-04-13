import { createSlice } from "@reduxjs/toolkit";
import axios from "axios"
import { toggleaddBookPopup } from "./popupSlice";
const bookSlice = createSlice({
  name: "book",
  initialState: {
    loading: false,
    error: null,
    message: null,
    books: [],
  },
  reducers: {
    fetchBooksRequest(state) {
      (state.loading = true), (state.error = null), (state.message = null);
    },
    fetchBooksRequestSuccess(state, action) {
      (state.loading = false),
        (state.books = action.payload),
        (state.message = null);
    },
    fetchBooksRequestFailed(state, action) {
      (state.loading = true),
        (state.error = action.payload),
        (state.message = null);
    },
    addBookRequest(state) {
      (state.loading = true), (state.error = null), (state.message = null);
    },
    addBookRequestSuccess(state, action) {
      (state.loading = true), (state.message = action.payload);
    },
    addBookRequestFailed(state, action) {
      (state.loading = false), (state.error = action.payload);
    },
    resetBookSlice(state) {
      (state.loading = false), (state.error = null), (state.message = null);
    },
  },
});

export const fetchAllBooks = () => async (dispatch) => {
  dispatch(bookSlice.actions.fetchBooksRequest());
  await axios.get("http://localhost:3000/api/v1/books-all", {
    withCredentials: true,
  })
    .then((res) => {
      dispatch(bookSlice.actions.fetchBooksRequestSuccess(res.data.books));
    })
    .catch((error) => {
      dispatch(
        bookSlice.actions.fetchBooksRequestFailed(error.response.data.message)
      );
    });
};


export const addBook = (data) => async (dispatch) => {
    dispatch(bookSlice.actions.addBookRequest());
    await axios.post("http://localhost:3000/api/v1/admin/add",data, {
      withCredentials: true,
      headers:{
        "Content-Type":"application/json"
      }
    })
      .then((res) => {
        dispatch(bookSlice.actions.addBookRequestSuccess(res.data.message));
        dispatch(toggleaddBookPopup())
      })
      .catch((error) => {
        dispatch(
          bookSlice.actions.addBookRequestFailed(error.response.data.message)
        );
      });
  };
  export const resetBookSlice=()=>(dispatch)=>{
      dispatch(bookSlice.actions.resetBookSlice())
  }
  export default bookSlice.reducer