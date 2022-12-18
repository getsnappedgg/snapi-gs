import express from "express";
export const cardRouter = express.Router();

const { protect, isAdmin } = require("../middleware/authMiddleware");

const {
	getCards,
	createCard,
	updateCard,
	deleteCard,
} = require("../controllers/cardController");

cardRouter.get("/", getCards);
cardRouter.post("/new", protect, isAdmin, createCard);
cardRouter.delete("/delete", protect, isAdmin, deleteCard);
cardRouter.put("/update", protect, isAdmin, updateCard);
