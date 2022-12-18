import express from "express";
import { cardRouter } from "./card";
import { userRouter } from "./users";
export const router = express.Router();

// const { protect } = require("../middleware/authMiddleware");

router.use("/cards", cardRouter);
router.use("/users", userRouter);
