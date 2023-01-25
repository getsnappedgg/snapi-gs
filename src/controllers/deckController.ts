import asyncHandler from "express-async-handler";
import { prisma } from "../index";

const getDecks = asyncHandler(async (req: any, res: any) => {
	const decks = await prisma.deck.findMany({}); // needs a limit
	res.json(decks);
});

const createDeck = asyncHandler(async (req: any, res: any) => {
	// const deck = prisma.deck.create({
	// 	data: {
	// TODO: create many to many relationship between decks and cards
	// 	},
	// });
	// res.send(200).json(deck);
});
