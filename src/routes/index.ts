import express from "express";
import { cardRouter } from "./card";
export const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

router.use("/cards", cardRouter);
