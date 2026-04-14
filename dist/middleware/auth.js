"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const appErrors_1 = require("../utils/appErrors");
const jwt_1 = require("../utils/jwt");
const authMiddleware = (req, _res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            throw new appErrors_1.AppError("Authorization token is missing", 401);
        }
        const parts = authHeader.split(" ");
        if (parts.length !== 2 || parts[0] !== "Bearer") {
            throw new appErrors_1.AppError("Invalid authorization format", 401);
        }
        const token = parts[1];
        const decoded = (0, jwt_1.verifyToken)(token);
        req.user = {
            userId: decoded.userId,
            email: decoded.email,
        };
        next();
    }
    catch (_error) {
        next(new appErrors_1.AppError("Unauthorized", 401));
    }
};
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=auth.js.map