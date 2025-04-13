import express from "express"
import { isAuthenticated, isAuthorized } from "../middlewares/authMiddleware.js";
import { getAllUsers } from "../controllers/adminuserControler.js";

const router =express.Router()

router.get("/all",isAuthenticated,isAuthorized("Admin"),getAllUsers)
export default router;