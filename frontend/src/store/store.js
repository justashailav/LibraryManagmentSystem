import {configureStore} from "@reduxjs/toolkit"
import authReducer from "./slices/authSlice"
import  userReducer  from "./slices/userSlice"
import  bookReducer  from "./slices/bookSlice"
import borrowReducer from "./slices/borrowSlics"
import popupReducer from "./slices/popupSlice"
export const store=configureStore({
    reducer:{
        auth:authReducer,
        user:userReducer,
        book:bookReducer,
        borrow:borrowReducer,
        popup:popupReducer
    }
}) 