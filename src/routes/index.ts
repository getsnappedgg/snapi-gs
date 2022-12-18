import express from "express";
import { cardRouter } from "./cards";
import { deckRouter } from "./decks";
import { userRouter } from "./users";
export const router = express.Router();

// const { protect } = require("../middleware/authMiddleware");

router.use("/cards", cardRouter);
router.use("/users", userRouter);
router.use("/decks", deckRouter);
