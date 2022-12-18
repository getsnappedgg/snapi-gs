import express from "express";
export const userRouter = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
	registerUser,
	loginUser,
    getMe,
    getDecks
} = require("../controllers/userController");

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/me", protect, getMe);
userRouter.get("/decks", protect, getDecks);

// userRouter.get("/", getUser);
// userRouter.post("/new", protect, createUser);
// userRouter.delete("/delete", protect, deleteUser);
// userRouter.put("/update", protect, updateUser);
