import express from "express";
export const cardRouter = express.Router();

const {
	getCards,
	createCard,
	updateCard,
	deleteCard
} = require("../controllers/cardController");

cardRouter.get('/', getCards)
cardRouter.post('/new', createCard)
cardRouter.delete('/delete', deleteCard)
cardRouter.put('/update', updateCard)
