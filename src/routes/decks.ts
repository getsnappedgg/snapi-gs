import express from "express";
import {
	createDeck,
	deleteDeck,
	editDeck,
	getDecks,
	getDecksByCardId,
	getSingleDeck,
} from "../controllers/deckController";
export const deckRouter = express.Router();

const { protect } = require("../middleware/authMiddleware");

deckRouter.route("/").post(protect, createDeck).get(getDecks);

deckRouter.route("/:deckId").get(getSingleDeck).delete(deleteDeck);
deckRouter.route("/card/:cardId").get(getDecksByCardId);
deckRouter.route("/edit").post(protect, editDeck);
