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
exports.deleteCard = exports.updateCard = exports.createCard = exports.getUniqueCard = exports.getCards = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const index_1 = require("../index");
const s3_1 = require("../lib/s3");
// @desc    Get cards
// @route   GET /api/cards
// @access  Private
exports.getCards = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cards = yield index_1.prisma.card.findMany({});
        const cardsWithImages = cards.map(card => {
            const compressedName = card.name
                .replace(/\b[a-z]/g, char => char.toUpperCase())
                .replace(/[^a-zA-Z0-9]/g, "")
                .replace(/'/g, "");
            let imageLink = "";
            if (process.env.NODE_ENV == "production") {
                imageLink =
                    "https://prod-getsnapped-images.s3.amazonaws.com/cards/" +
                        `${compressedName}` +
                        `.webp`;
            }
            else {
                imageLink =
                    "https://dev-getsnapped-images.s3.amazonaws.com/cards/" +
                        `${compressedName}` +
                        `.webp`;
            }
            const cardWithImage = Object.assign(Object.assign({}, card), { imageLink });
            return cardWithImage;
        });
        res.status(200).send(cardsWithImages);
    }
    catch (error) {
        console.error(error);
    }
}));
exports.getUniqueCard = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.params;
        let card = yield index_1.prisma.card.findUnique({
            where: {
                name,
            },
        });
        if (!card) {
            throw new Error(`Card with name ${name} not found`);
        }
        const { s3Key, s3Bucket } = card;
        // Retrieve the image from S3
        const image = yield s3_1.s3
            .getObject({
            Bucket: s3Bucket,
            Key: s3Key,
        })
            .promise();
        /* AbsorbingMan.webp */
        const compressedName = card.name
            .replace(/\b[a-z]/g, char => char.toUpperCase())
            .replace(/[^a-zA-Z0-9]/g, "")
            .replace(/'/g, "");
        const imageLink = "https://prod-getsnapped-images.s3.amazonaws.com/cards/" +
            `${compressedName}` +
            `.webp`;
        const cardWithImage = Object.assign(Object.assign({}, card), { imageLink });
        console.log(cardWithImage);
        res.status(200).json(cardWithImage);
    }
    catch (error) {
        console.error(error);
    }
}));
// @desc    Create cards
// @route   POST /api/cards/new
// @access  Private
exports.createCard = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, cost, power, description, source, s3Key, s3Bucket } = req.body;
    const card = yield index_1.prisma.card.create({
        data: {
            name,
            cost,
            power,
            description,
            source,
            s3Key,
            s3Bucket,
        },
    });
    // TODO: Use multer to upload an image to S3
    res.json(card);
}));
// @desc    Update card
// @route   PUT /api/cards/update
// @access  Private
exports.updateCard = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, name, cost, power, description, source } = req.body;
    const updatedCard = yield index_1.prisma.card.update({
        where: {
            id,
        },
        data: {
            name,
            cost,
            power,
            description,
            source,
        },
    });
    res.json(updatedCard);
}));
// @desc    Delete card
// @route   DELETE /api/cards/delete
// @access  Private
exports.deleteCard = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    const deletedCard = yield index_1.prisma.card.delete({
        where: {
            id,
        },
    });
    res.json(deletedCard);
}));
//# sourceMappingURL=cardController.js.map