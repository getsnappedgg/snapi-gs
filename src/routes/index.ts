import express from "express";
import { cardRouter } from "./card";
import { deckRouter } from "./deck";
import { userRouter } from "./user";
export const router = express.Router();

// const { protect } = require("../middleware/authMiddleware");

router.use("/cards", cardRouter);
router.use("/users", userRouter);
router.use("/decks", deckRouter);
