"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
function errorHandler(err, _req, res, _next) {
    const statusCode = err.statusCode ?? 500;
    res.status(statusCode).json({
        message: err.message || "Internal server error",
    });
}
//# sourceMappingURL=errorHandler.js.map