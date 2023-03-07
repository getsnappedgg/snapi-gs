import { PrismaClient } from "@prisma/client";
import express from "express";
import morgan from "morgan";
import { createClient } from "redis";
import { router } from "./routes";

const cors = require("cors");
export const prisma = new PrismaClient();

const app = express();
const PORT = process.env.PORT;

// Redis
// const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";
// const DEFAULT_REDIS_EXPIRATION = process.env.DEFAULT_REDIS_EXPIRATION || 10800;
// export const redis: any = createClient({ url: REDIS_URL });
// redis.on("error", (err: any) => console.error("Redis Client Error: ", err));
// redis.connect();
console.log("hello hello hello hello");
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

app.use(function (err: any, req: any, res: any, next: any) {
	if (process.env.NODE_ENV !== "test") console.error(err.stack);
	res.status(err.status || 500).send(err.message || "Internal server error");
});
