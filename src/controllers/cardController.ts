const asyncHandler = require("express-async-handler");
import { prisma } from "../index";
const { s3, params } = require("../lib/s3");

// @desc    Get cards
// @route   GET /api/cards
// @access  Private
export const getCards = asyncHandler(async (req: any, res: any) => {
	try {
		console.log("im here");
		const cards = await prisma.card.findMany({});
		res.status(200).send(cards);
	} catch (error) {
		console.error(error);
	}
});

export const getUniqueCard = asyncHandler(async (req: any, res: any) => {
	try {
		const { name } = req.params;
		const card = await prisma.card.findUnique({
			where: {
				name,
			},
		});
		if (!card) {
			throw new Error(`Card with name ${name} not found`);
		}
		const { s3Key, s3Bucket } = card;
		// Retrieve the image from S3
		const image = await s3
			.getObject({
				Bucket: s3Bucket,
				Key: s3Key,
			})
			.promise();
		console.log(card);
		console.log(image);
		res.status(200).json(card);
	} catch (error) {
		console.error(error);
	}
});

// @desc    Create cards
// @route   POST /api/cards/new
// @access  Private
export const createCard = asyncHandler(async (req: any, res: any) => {
	const {
		name,
		cost,
		power,
		description,
		pool,
		flavorText,
		keyword,
		s3Key,
		s3Bucket,
	} = req.body;
	params.Key = name;
	const card = await prisma.card.create({
		data: {
			name,
			cost,
			power,
			description,
			pool,
			flavorText,
			keyword,
			s3Key,
			s3Bucket,
		},
	});
	res.json(card);
});

// @desc    Update card
// @route   PUT /api/cards/update
// @access  Private
export const updateCard = asyncHandler(async (req: any, res: any) => {
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

// @desc    Delete card
// @route   DELETE /api/cards/delete
// @access  Private
export const deleteCard = asyncHandler(async (req: any, res: any) => {
	const { id } = req.body;
	const deletedCard = await prisma.card.delete({
		where: {
			id,
		},
	});
	res.json(deletedCard);
});

// module.exports = {
// 	getCards,
// 	getUniqueCard,
// 	updateCard,
// 	createCard,
// 	deleteCard,
// };
