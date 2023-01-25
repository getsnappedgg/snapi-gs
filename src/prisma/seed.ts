import { PrismaClient } from "@prisma/client";
// import { Pool, Role } from "../constants/enums";
import { Keyword, Source } from "../constants/enums";
import cardList from "./cardList.json";
import locationList from "./locationList.json";
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");

const cardListsBySource: any = {};
const cardListsByKeyword: any = {};
async function main() {
	await seedKeywords();
	await seedCards();
	await seedSources();
	// await seedUsers();
	await seedLocations();
	// await seedDecks();
}

const seedLocations = async (): Promise<void> => {
	locationList.forEach(async location => {
		const locationName = location["name"]
			.replace(/\b[a-z]/g, char => char.toUpperCase())
			.replace(/[^a-zA-Z0-9]/g, "")
			.replace(/'/g, "");
		await prisma.location.create({
			data: {
				name: location.name,
				description: location.description,
				s3Key: `locations/${locationName}.webp`,
				s3Bucket: `dev-getsnapped-images`,
			},
		});
	});
};

const seedKeywords = async (): Promise<void> => {
	for (const keywordId in Keyword) {
		const keywordValue = (Keyword as any)[keywordId];
		await prisma.keyword.create({
			data: {
				id: keywordId,
				keyword: keywordValue,
			},
		});
	}
};

const seedSources = async (): Promise<void> => {
	for (const sourceId in Source) {

		const sourceValue = (Source as any)[sourceId];
		await prisma.source.create({
			data: {
				id: sourceId,
				name: sourceValue,
				cards: {
					connect: cardListsBySource[sourceId],
				},
			},
		});
	}
};

const getKeywords = (text: string): string[] => {
	const keywordDictionary = {};
	if (text === "No Ability.") {
		return [];
	}
	const splitText = text
		.toUpperCase()
		.replace(/[^a-zA-Z0-9]/g, " ")
		.split(" ");

	splitText.forEach(word => {
		if (word.includes((Keyword as any)[word])) {
			(keywordDictionary as any)[word] = true;
		}
	});
	if (Object.keys(keywordDictionary).length == 0) {
		return [Keyword.SPECIAL];
	}

	return Object.keys(keywordDictionary);
};

const seedCards = async (): Promise<void> => {
	cardList.forEach(async card => {
		const cardName = card.name
			.replace(/\b[a-z]/g, char => char.toUpperCase())
			.replace(/[^a-zA-Z0-9]/g, "")
			.replace(/'/g, "");

		if (!cardListsBySource[card.source]) {
			cardListsBySource[card.source] = [];
		}
		cardListsBySource[card.source].push({ name: card.name });

		const keywordList = getKeywords(card.description);

		const keywordConnections = keywordList.map((word: string) => {
			const connection = {
				keyword: {
					connect: {
						id: word,
					},
				},
			};
			return connection;
		});
		await prisma.card.create({
			data: {
				name: card.name,
				cost: card.cost,
				power: card.power,
				description: card.description,
				s3Key: `cards/${cardName}.webp`,
				s3Bucket: `dev-getsnapped-images`,
				keywords: {
					create: keywordConnections,
				},
			},
		});
	});
};

const seedUsers = async (): Promise<void> => {
	const hashPassword = async (password: string): Promise<string> => {
		// Hash password
		const passSalt = 10;
		const salt = await bcrypt.genSalt(passSalt);
		const hashedPassword = await bcrypt.hash(password, salt);
		return hashedPassword;
	};
	const alice = await prisma.user.upsert({
		where: { email: "alice@gmail.com" },
		update: {},
		create: {
			email: "alice@test.com",
			name: "Alice",
			password: await hashPassword("123abc"),
		},
	});
	const bob = await prisma.user.upsert({
		where: { email: "bob@prisma.io" },
		update: {},
		create: {
			email: "bob@test.com",
			name: "Bob",
			password: await hashPassword("123abc"),
		},
	});
	console.log({ alice, bob });
};

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async e => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
