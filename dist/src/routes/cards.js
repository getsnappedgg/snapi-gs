"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cardRouter = void 0;
const express_1 = __importDefault(require("express"));
exports.cardRouter = express_1.default.Router();
const s3 = require("../lib/s3");
const { protect, isAdmin } = require("../middleware/authMiddleware");
// import { fetchRedisCardList } from "../middleware/redisMiddleware";
const cardController_1 = require("../controllers/cardController");
exports.cardRouter.get("/", cardController_1.getCards);
// cardRouter.get("/", fetchRedisCardList, getCards);
exports.cardRouter.get("/:name", cardController_1.getUniqueCard);
exports.cardRouter.post("/new", protect, isAdmin, cardController_1.createCard);
exports.cardRouter.delete("/delete", protect, isAdmin, cardController_1.deleteCard);
exports.cardRouter.put("/update", protect, isAdmin, cardController_1.updateCard);
//# sourceMappingURL=cards.js.map