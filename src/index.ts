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

app.listen(PORT, () =>
	console.log(`Mixing it up on port ${PORT} at http://localhost:${PORT}`)
);
