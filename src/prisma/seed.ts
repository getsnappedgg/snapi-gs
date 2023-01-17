import { PrismaClient } from "@prisma/client";
import { Pool, Role } from "../constants/enums";
import cardList from "./cardList.json";
import locationList from "./locationList.json";
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");
const s3Config = require("../config/s3Config");

//   id       Int    @id @default(autoincrement())
//   name     String
//   email    String
//   passSalt Int
//   passHash String
//   decks    Deck[]
//   role     Role   @default(USER)
const hashPassword = async (password: string): Promise<string> => {
	// Hash password
	const passSalt = 10;
	const salt = await bcrypt.genSalt(passSalt);
	const hashedPassword = await bcrypt.hash(password, salt);
	return hashedPassword;
};

async function main() {
	seedUsers();
	seedCards();
	seedLocations();
	// seedDecks();
}

const seedLocations = async () => {
	for (const location of locationList) {
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
	}
};
const seedCards = async () => {
	for (const card of cardList) {
		const cardName = card.card
			.replace(/\b[a-z]/g, char => char.toUpperCase())
			.replace(/[^a-zA-Z0-9]/g, "")
			.replace(/'/g, "");

		await prisma.card.create({
			data: {
				name: card.card,
				cost: card.cost,
				power: card.power,
				description: card.description,
				pool: Pool.POOL_1,
				flavorText: card.flavorText,
				keyword: card.keyword,
				s3Key: `cards/${cardName}.webp`,
				s3Bucket: `dev-getsnapped-images`,
			},
		});
	}
};
const seedUsers = async () => {
	const alice = await prisma.user.upsert({
		where: { email: "alice@gmail.com" },
		update: {},
		create: {
			id: 1,
			email: "alice@gmail.com",
			name: "Alice",
			password: await hashPassword("123"),
			role: Role.USER,
		},
	});
	const bob = await prisma.user.upsert({
		where: { email: "bob@prisma.io" },
		update: {},
		create: {
			id: 2,
			email: "bob@prisma.io",
			name: "Bob",
			password: await hashPassword("123"),
			role: Role.ADMIN,
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
