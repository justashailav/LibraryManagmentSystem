import express from "express"
import { isAuthenticated, isAuthorized } from "../middlewares/authMiddleware.js";
import { borrowBooks, getBorrowedBooksForAdmin, recordBorrowedBooks, returnBorrowedBook } from "../controllers/borrowController.js";
;

const router =express.Router()

router.post("/record-borrow-book/:id",isAuthenticated,isAuthorized("Admin"),recordBorrowedBooks);
router.put("/return-borrow-book/:bookId",isAuthenticated,isAuthorized("Admin"),returnBorrowedBook);
router.get("/borrowed-books-by-users",isAuthenticated,isAuthorized("Admin"),getBorrowedBooksForAdmin);
router.get("/my-borrowed-books",isAuthenticated,borrowBooks);
export default router;