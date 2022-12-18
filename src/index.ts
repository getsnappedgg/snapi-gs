import { PrismaClient } from "@prisma/client";
import express from "express";
import morgan from "morgan";
import { router } from "./routes";

export const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT;
app.use(morgan("dev"));
app.use(express.json());
app.use("/api", router);

// app.put("/publish/:id", async (req: any, res: any) => {
// 	const { id } = req.params;
// 	const post = await prisma.post.update({
// 		where: { id },
// 		data: { published: true },
// 	});
// 	res.json(post);
// });

app.delete("/user/:id", async (req: any, res: any) => {
	const { id } = req.params;
	const user = await prisma.user.delete({
		where: {
			id,
		},
	});
	res.json(user);
});
app.delete("/card/:id", async (req: any, res: any) => {
	const { id } = req.params;
	const card = await prisma.card.delete({
		where: {
			id,
		},
	});
	res.json(card);
});

app.listen(PORT, () =>
	console.log(`Mixing it up on port ${PORT} at http://localhost:${PORT}`)
);
