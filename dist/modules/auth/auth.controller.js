"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.me = exports.login = exports.register = void 0;
const auth_services_1 = require("./auth.services");
const appErrors_1 = require("../../utils/appErrors");
const register = async (req, res, next) => {
    try {
        const result = await (0, auth_services_1.registerUser)(req.body);
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.register = register;
const login = async (req, res, next) => {
    try {
        const result = await (0, auth_services_1.loginUser)(req.body);
        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.login = login;
const me = async (req, res, next) => {
    try {
        if (!req.user?.userId) {
            throw new appErrors_1.AppError("Unauthorized", 401);
        }
        const user = await (0, auth_services_1.getCurrentUser)(req.user.userId);
        res.status(200).json({
            success: true,
            message: "Current user fetched successfully",
            data: user,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.me = me;
//# sourceMappingURL=auth.controller.js.map