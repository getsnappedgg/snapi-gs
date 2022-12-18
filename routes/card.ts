import express from "express";
import { prisma } from "../index";
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

// cardRouter.put("/update", async (req: any, res: any) => {
// 	const { id, name, cost, power, description, pool, flavorText, keyword } =
// 		req.body;
// 	const updatedCard = await prisma.card.update({
// 		where: {
// 			id,
// 		},
// 		data: {
// 			name,
// 			cost,
// 			power,
// 			description,
// 			pool,
// 			flavorText,
// 			keyword,
// 		},
// 	});
// 	res.json(updatedCard);
// });
// cardRouter.post("/new", async (req: any, res: any) => {
// 	const { name, cost, power, description, pool, flavorText, keyword } =
// 		req.body;
// 	const card = await prisma.card.create({
// 		data: {
// 			name,
// 			cost,
// 			power,
// 			description,
// 			pool,
// 			flavorText,
// 			keyword,
// 		},
// 	});
// 	res.json(card);
// });
// cardRouter.delete("/delete", async (req: any, res: any) => {
// 	const { id } = req.body;
// 	const deletedCard = await prisma.card.delete({
// 		where: {
// 			id,
// 		},
// 	});
// 	res.json(deletedCard);
// });

