import { User } from "../models/userModel.js";
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ accountVerified: true });
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      success: false,
      message: "Failed to get users",
    });
  }
};
