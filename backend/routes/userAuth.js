import express from "express"
import { ForgotPassword, GetUser, Login, Logout, Register, ResetPassword, UpdatePassword, verifyOTP } from "../controllers/userController.js"
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const router =express.Router()

router.post("/register",Register);
router.post("/verify-otp",verifyOTP);
router.post("/login",Login);
router.get("/logout",isAuthenticated, Logout);
router.get("/me",isAuthenticated, GetUser);
router.post("/password/forgot",ForgotPassword);
router.put("/password/reset/:token",ResetPassword);
router.put("/password/update",isAuthenticated,UpdatePassword);
export default router;