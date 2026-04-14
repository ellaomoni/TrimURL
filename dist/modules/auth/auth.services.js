"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentUser = exports.loginUser = exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = require("../../config/prisma");
const appErrors_1 = require("../../utils/appErrors");
const jwt_1 = require("../../utils/jwt");
const registerUser = async (payload) => {
    const { name, email, password } = payload;
    const existingUser = await prisma_1.prisma.user.findUnique({
        where: { email },
    });
    if (existingUser) {
        throw new appErrors_1.AppError("User with this email already exists", 409);
    }
    const hashedPassword = await bcrypt_1.default.hash(password, 10);
    const user = await prisma_1.prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
        },
    });
    const token = (0, jwt_1.generateToken)({
        userId: user.id,
        email: user.email,
    });
    return {
        user,
        token,
    };
};
exports.registerUser = registerUser;
const loginUser = async (payload) => {
    const { email, password } = payload;
    const user = await prisma_1.prisma.user.findUnique({
        where: { email },
    });
    if (!user) {
        throw new appErrors_1.AppError("Invalid email or password", 401);
    }
    const isPasswordCorrect = await bcrypt_1.default.compare(password, user.password);
    if (!isPasswordCorrect) {
        throw new appErrors_1.AppError("Invalid email or password", 401);
    }
    const token = (0, jwt_1.generateToken)({
        userId: user.id,
        email: user.email,
    });
    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
        },
        token,
    };
};
exports.loginUser = loginUser;
const getCurrentUser = async (userId) => {
    const user = await prisma_1.prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    if (!user) {
        throw new appErrors_1.AppError("User not found", 404);
    }
    return user;
};
exports.getCurrentUser = getCurrentUser;
//# sourceMappingURL=auth.services.js.map