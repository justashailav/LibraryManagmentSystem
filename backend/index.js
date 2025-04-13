import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import dbConnect from "./config/db.js"
import cors from "cors";
import userRoute from "./routes/userAuth.js"
import adminuserRoute from "./routes/adminuser.js"
import booksRoute from "./routes/bookRoute.js"
import borrowedBooksRoute from "./routes/bookBorrowRoute.js"
const app=express();
dotenv.config({});
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOptions = {
    origin:'library-managment-system-backend.vercel.app',
    credentials:true
}
const PORT = process.env.PORT || 4000;
app.use(cors(corsOptions));
dbConnect()
// mout
app.use("/api/v1",userRoute);
app.use("/api/v1",adminuserRoute);
app.use("/api/v1",booksRoute);
app.use("/api/v1",borrowedBooksRoute);
app.listen(PORT,()=>{
    console.log(`Server running at port ${PORT}`);
})
