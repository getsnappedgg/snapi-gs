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
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = exports.protect = void 0;
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const index_1 = require("../index");
exports.protect = asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")) {
        try {
            // Get token from header
            token = req.headers.authorization.split(" ")[1];
            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // Get user from the token
            req.user = yield index_1.prisma.user.findUnique({
                where: { id: decoded.id },
            });
            next();
        }
        catch (error) {
            res.status(401);
            throw new Error("Not authorized");
        }
    }
}));
exports.isAdmin = asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.user.role != "ADMIN") {
            res.status(401);
            throw new Error("Not authorized");
        }
        next();
    }
    catch (error) {
        res.status(401);
        throw new Error("Not authorized");
    }
}));
// export const isAdmin = (req: any, res: any, next: any) => {
// };
module.exports = {
    protect: exports.protect,
    isAdmin: exports.isAdmin,
};
//# sourceMappingURL=authMiddleware.js.map