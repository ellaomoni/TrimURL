"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redirectToLongUrl = exports.deleteLink = exports.getLinkById = exports.getLinks = exports.createLink = void 0;
const analytics_services_1 = require("../analytics/analytics.services");
const appErrors_1 = require("../../utils/appErrors");
const links_services_1 = require("./links.services");
const createLink = async (req, res, next) => {
    try {
        if (!req.user?.userId) {
            throw new appErrors_1.AppError("Unauthorized", 401);
        }
        const link = await (0, links_services_1.createShortLink)(req.user.userId, req.body);
        res.status(201).json({
            success: true,
            message: "Short link created successfully",
            data: link,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.createLink = createLink;
const getLinks = async (req, res, next) => {
    try {
        if (!req.user?.userId) {
            throw new appErrors_1.AppError("Unauthorized", 401);
        }
        const page = Math.max(1, Number(req.query.page) || 1);
        const limit = Math.min(50, Math.max(1, Number(req.query.limit) || 10));
        const links = await (0, links_services_1.getUserLinks)(req.user.userId, page, limit);
        res.status(200).json({
            success: true,
            message: "Links fetched successfully",
            data: links,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getLinks = getLinks;
const getLinkById = async (req, res, next) => {
    try {
        if (!req.user?.userId) {
            throw new appErrors_1.AppError("Unauthorized", 401);
        }
        const link = await (0, links_services_1.getSingleUserLink)(req.user.userId, req.params.id);
        res.status(200).json({
            success: true,
            message: "Link fetched successfully",
            data: link,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getLinkById = getLinkById;
const deleteLink = async (req, res, next) => {
    try {
        if (!req.user?.userId) {
            throw new appErrors_1.AppError("Unauthorized", 401);
        }
        const result = await (0, links_services_1.deleteUserLink)(req.user.userId, req.params.id);
        res.status(200).json({
            success: true,
            message: result.message,
            data: {
                id: result.id,
            },
        });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteLink = deleteLink;
const redirectToLongUrl = async (req, res, next) => {
    try {
        const { shortCode } = req.params;
        const link = await (0, links_services_1.getLinkByShortCode)(shortCode);
        const ipAddress = req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
            req.socket.remoteAddress ||
            null;
        const userAgent = req.get("user-agent") || null;
        const referrer = req.get("referer") || null;
        await (0, analytics_services_1.trackClickEvent)({
            shortLinkId: link.id,
            ipAddress,
            userAgent,
            referrer,
        });
        return res.redirect(link.longUrl);
    }
    catch (error) {
        next(error);
    }
};
exports.redirectToLongUrl = redirectToLongUrl;
//# sourceMappingURL=links.contoller.js.map