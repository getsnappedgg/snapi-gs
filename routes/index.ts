import express from "express";
import { cardRouter } from "./card";
export const router = express.Router();

router.use("/cards", cardRouter);
