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
const client_1 = require("@prisma/client");
// import { Pool, Role } from "../constants/enums";
const enums_1 = require("../constants/enums");
const cardList_json_1 = __importDefault(require("./cardList.json"));
const locationList_json_1 = __importDefault(require("./locationList.json"));
const prisma = new client_1.PrismaClient();
const bcrypt = require("bcryptjs");
const cardListsBySource = {};
const cardListsByKeyword = {};
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield seedKeywords();
        yield seedCards();
        yield seedSources();
        // await seedUsers();
        yield seedLocations();
        // await seedDecks();
    });
}
const seedLocations = () => __awaiter(void 0, void 0, void 0, function* () {
    locationList_json_1.default.forEach((location) => __awaiter(void 0, void 0, void 0, function* () {
        const locationName = location["name"]
            .replace(/\b[a-z]/g, char => char.toUpperCase())
            .replace(/[^a-zA-Z0-9]/g, "")
            .replace(/'/g, "");
        yield prisma.location.create({
            data: {
                name: location.name,
                description: location.description,
                s3Key: `locations/${locationName}.webp`,
                s3Bucket: `dev-getsnapped-images`,
            },
        });
    }));
});
const seedKeywords = () => __awaiter(void 0, void 0, void 0, function* () {
    for (const keywordId in enums_1.Keyword) {
        const keywordValue = enums_1.Keyword[keywordId];
        yield prisma.keyword.create({
            data: {
                id: keywordId,
                keyword: keywordValue,
            },
        });
    }
});
const seedSources = () => __awaiter(void 0, void 0, void 0, function* () {
    for (const sourceId in enums_1.Source) {
        const sourceValue = enums_1.Source[sourceId];
        yield prisma.source.create({
            data: {
                id: sourceId,
                name: sourceValue,
                cards: {
                    connect: cardListsBySource[sourceId],
                },
            },
        });
    }
});
const getKeywords = (text) => {
    const keywordDictionary = {};
    if (text === "No Ability.") {
        return [];
    }
    const splitText = text
        .toUpperCase()
        .replace(/[^a-zA-Z0-9]/g, " ")
        .split(" ");
    splitText.forEach(word => {
        if (word.includes(enums_1.Keyword[word])) {
            keywordDictionary[word] = true;
        }
    });
    if (Object.keys(keywordDictionary).length == 0) {
        return [enums_1.Keyword.SPECIAL];
    }
    return Object.keys(keywordDictionary);
};
const seedCards = () => __awaiter(void 0, void 0, void 0, function* () {
    cardList_json_1.default.forEach((card) => __awaiter(void 0, void 0, void 0, function* () {
        const cardName = card.name
            .replace(/\b[a-z]/g, char => char.toUpperCase())
            .replace(/[^a-zA-Z0-9]/g, "")
            .replace(/'/g, "");
        if (!cardListsBySource[card.source]) {
            cardListsBySource[card.source] = [];
        }
        cardListsBySource[card.source].push({ name: card.name });
        const keywordList = getKeywords(card.description);
        const keywordConnections = keywordList.map((word) => {
            const connection = {
                keyword: {
                    connect: {
                        id: word,
                    },
                },
            };
            return connection;
        });
        yield prisma.card.create({
            data: {
                name: card.name,
                cost: card.cost,
                power: card.power,
                description: card.description,
                s3Key: `cards/${cardName}.webp`,
                s3Bucket: `dev-getsnapped-images`,
                keywords: {
                    create: keywordConnections,
                },
            },
        });
    }));
});
const seedUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
        // Hash password
        const passSalt = 10;
        const salt = yield bcrypt.genSalt(passSalt);
        const hashedPassword = yield bcrypt.hash(password, salt);
        return hashedPassword;
    });
    const alice = yield prisma.user.upsert({
        where: { email: "alice@gmail.com" },
        update: {},
        create: {
            email: "alice@test.com",
            name: "Alice",
            password: yield hashPassword("123abc"),
        },
    });
    const bob = yield prisma.user.upsert({
        where: { email: "bob@prisma.io" },
        update: {},
        create: {
            email: "bob@test.com",
            name: "Bob",
            password: yield hashPassword("123abc"),
        },
    });
    console.log({ alice, bob });
});
main()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}))
    .catch((e) => __awaiter(void 0, void 0, void 0, function* () {
    console.error(e);
    yield prisma.$disconnect();
    process.exit(1);
}));
//# sourceMappingURL=seed.js.map