"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deckRouter = void 0;
const express_1 = __importDefault(require("express"));
const deckController_1 = require("../controllers/deckController");
exports.deckRouter = express_1.default.Router();
const { protect } = require("../middleware/authMiddleware");
exports.deckRouter.route("/").post(protect, deckController_1.createDeck).get(deckController_1.getDecks);
exports.deckRouter.route("/:deckId").get(deckController_1.getSingleDeck).delete(deckController_1.deleteDeck);
exports.deckRouter.route("/card/:cardId").get(deckController_1.getDecksByCardId);
exports.deckRouter.route("/edit").post(protect, deckController_1.editDeck);
//# sourceMappingURL=decks.js.map