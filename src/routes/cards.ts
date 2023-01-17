import express from "express";
export const cardRouter = express.Router();
const s3 = require("../lib/s3");

const { protect, isAdmin } = require("../middleware/authMiddleware");

import {
	createCard,
	deleteCard,
	getCards,
	getUniqueCard,
	updateCard,
} from "../controllers/cardController";

cardRouter.get("/", getCards);
cardRouter.get("/:name", getUniqueCard);
cardRouter.post("/new", protect, isAdmin, createCard);
cardRouter.delete("/delete", protect, isAdmin, deleteCard);
cardRouter.put("/update", protect, isAdmin, updateCard);
