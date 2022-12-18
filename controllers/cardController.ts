const asyncHandler = require("express-async-handler");
import { prisma } from "../index";
// @desc    Get cards
// @route   GET /api/cards
// @access  Private
const getCards = asyncHandler(async (req: any, res: any) => {
	const cards = await prisma.card.findMany({
		where: { pool: req.pool },
		// include: { author: true },
	});
	res.json(cards);
});

const createCard = asyncHandler(async (req: any, res: any) => {
	const { name, cost, power, description, pool, flavorText, keyword } =
		req.body;
	const card = await prisma.card.create({
		data: {
			name,
			cost,
			power,
			description,
			pool,
			flavorText,
			keyword,
		},
	});
	res.json(card);
});

const updateCard = asyncHandler(async (req: any, res: any) => {
	const { id, name, cost, power, description, pool, flavorText, keyword } =
		req.body;
	const updatedCard = await prisma.card.update({
		where: {
			id,
		},
		data: {
			name,
			cost,
			power,
			description,
			pool,
			flavorText,
			keyword,
		},
	});
	res.json(updatedCard);
});

const deleteCard = asyncHandler(async (req: any, res: any) => {
	const { id } = req.body;
	const deletedCard = await prisma.card.delete({
		where: {
			id,
		},
	});
	res.json(deletedCard);
});

module.exports = {
	getCards,
	updateCard,
	createCard,
	deleteCard,
};
