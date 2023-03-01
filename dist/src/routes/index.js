"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const cards_1 = require("./cards");
const decks_1 = require("./decks");
const users_1 = require("./users");
exports.router = express_1.default.Router();
// const { protect } = require("../middleware/authMiddleware");
exports.router.use("/cards", cards_1.cardRouter);
exports.router.use("/users", users_1.userRouter);
exports.router.use("/decks", decks_1.deckRouter);
//# sourceMappingURL=index.js.map