import express from "express";
export const userRouter = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
	registerUser,
	loginUser,
	getMe,
} = require("../controllers/userController");

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/me", protect, getMe);
