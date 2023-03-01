"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDecksByCardId = exports.editDeck = exports.deleteDeck = exports.createDeck = exports.getSingleDeck = exports.getDecks = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const index_1 = require("../index");
exports.getDecks = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const decks = yield index_1.prisma.deck.findMany({
        include: {
            cards: true,
        },
    }); // needs a limit
    res.json(decks);
}));
exports.getSingleDeck = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { deckId } = req.params;
        deckId = parseInt(deckId);
        const deck = yield index_1.prisma.deck.findUnique({
            where: {
                id: deckId,
            },
            include: {
                cards: true,
            },
        });
        if (!deck) {
            throw new Error("can't find deck");
        }
        else {
            res.status(200).json(deck);
        }
    }
    catch (error) {
        console.error(error);
        next();
    }
}));
exports.createDeck = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { name, cardIds, userId } = req.body;
    try {
        if (cardIds.length != 12) {
            throw Error("Deck is not full");
        }
        cardIds = cardIds.map((id) => ({ id }));
        const deck = yield index_1.prisma.deck.create({
            data: {
                userId,
                name,
                cards: {
                    connect: cardIds,
                },
            },
        });
        res.status(200).json(deck);
    }
    catch (error) {
        console.log(error);
    }
}));
exports.deleteDeck = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        const deletedDeck = yield index_1.prisma.deck.delete({
            where: {
                id,
            },
        });
        // const deletedIds = await prisma.cardsOnDecks.deleteMany({
        // 	where: {
        // 		deckId: id,
        // 	},
        // });
        // console.log(deletedIds);
        // res.status(200).json(deletedDeck);
    }
    catch (error) {
        console.error(error);
    }
}));
exports.editDeck = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, cards } = req.body;
    if (cards.length != 12)
        throw new Error("deck length invalid");
    // const updatedDeck = prisma.cardsOnDecks.
}));
exports.getDecksByCardId = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cardId = parseInt(req.params.cardId);
        let decksByCardId = yield index_1.prisma.deck.findMany({
            where: {
                cards: {
                    some: {
                        id: cardId,
                    },
                },
            },
            include: {
                cards: {
                    include: {
                        keywords: {
                            select: {
                                keywordId: true,
                            },
                        },
                    },
                },
            },
        });
        if (!decksByCardId.length)
            throw new Error("no decks found");
        const decks = [];
        decksByCardId.forEach(deck => {
            const newDeck = {
                id: deck.id,
                name: deck.name,
                userId: deck.userId,
            };
            const cardList = deck.cards.map(card => {
                const { id, name, power, description, sourceId, keywords } = card;
                return {
                    id,
                    name,
                    power,
                    description,
                    source: sourceId,
                    keywords,
                };
            });
            newDeck.cardList = cardList;
            decks.push(newDeck);
        });
        res.status(200).send(decks);
    }
    catch (error) {
        console.log(error);
    }
}));
//# sourceMappingURL=deckController.js.map