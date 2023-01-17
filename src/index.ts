import { PrismaClient } from "@prisma/client";
import express from "express";
import morgan from "morgan";
import { router } from "./routes";
const cors = require('cors')

export const prisma = new PrismaClient();

const app = express();
const PORT = process.env.PORT;

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
});

app.use("/api", router);

app.listen(PORT, () =>
	console.log(`Server running at http://localhost:${PORT}`)
);
