"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
exports.userRouter = express_1.default.Router();
const { protect } = require("../middleware/authMiddleware");
const userController_1 = require("../controllers/userController");
exports.userRouter.post("/register", userController_1.registerUser);
exports.userRouter.post("/login", userController_1.loginUser);
exports.userRouter.get("/me", protect, userController_1.getMe);
//# sourceMappingURL=users.js.map