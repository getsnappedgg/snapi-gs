import { PrismaClient } from "@prisma/client";
import express from "express";
import morgan from "morgan";
const prisma = new PrismaClient();
const app = express();
const PORT = 3000;
app.use(morgan("dev"));
app.use(express.json());
app.get("/cards", async (req, res) => {
	const cards = await prisma.card.findMany({
		where: { pool: req.pool },
		// include: { author: true },
	});
	res.json(cards);
});

app.post("/card/new", async (req, res) => {
	//   name        String   @unique
	//   cost        Int
	//   power       Int
	//   description String
	//   pool        String
	//   releaseDate DateTime @unique
	//   flavorText  String
	console.log(req.body);
	const { name, cost, power, description, pool, flavorText } = req.body;
	const post = await prisma.card.create({
		data: {
			name,
			cost,
			power,
			description,
			pool,
			flavorText,
		},
	});
	res.json(post);
});

app.put("/publish/:id", async (req, res) => {
	const { id } = req.params;
	const post = await prisma.post.update({
		where: { id },
		data: { published: true },
	});
	res.json(post);
});

app.delete("/user/:id", async (req, res) => {
	const { id } = req.params;
	const user = await prisma.user.delete({
		where: {
			id,
		},
	});
	res.json(user);
});

const server = app.listen(PORT, () =>
	console.log(`Mixing it up on port ${PORT} at http://localhost:${PORT}`)
);
