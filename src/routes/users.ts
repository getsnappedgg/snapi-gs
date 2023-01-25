import express from "express";
export const userRouter = express.Router();

const { protect } = require("../middleware/authMiddleware");

import { getMe, loginUser, registerUser } from "../controllers/userController";

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/me", protect, getMe);
