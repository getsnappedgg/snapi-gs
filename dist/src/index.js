"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const routes_1 = require("./routes");
const cors = require("cors");
exports.prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
const PORT = process.env.PORT;
// Redis
// const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";
// const DEFAULT_REDIS_EXPIRATION = process.env.DEFAULT_REDIS_EXPIRATION || 10800;
// export const redis: any = createClient({ url: REDIS_URL });
// redis.on("error", (err: any) => console.error("Redis Client Error: ", err));
// redis.connect();
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use("/api", routes_1.router);
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
app.use(function (err, req, res, next) {
    if (process.env.NODE_ENV !== "test")
        console.error(err.stack);
    res.status(err.status || 500).send(err.message || "Internal server error");
});
//# sourceMappingURL=index.js.map