import express from "express";
export const deckRouter = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
	createDeck,
	getDecks,
	deleteDeck,
} = require("../controllers/userController");

deckRouter.route("/").post(protect, createDeck).get(getDecks);
deckRouter.delete("/:deckId", deleteDeck);
