"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redirectToLongUrl = exports.deleteLink = exports.getLinkById = exports.getLinks = exports.createLink = void 0;
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
        const links = await (0, links_services_1.getUserLinks)(req.user.userId);
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
        });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteLink = deleteLink;
// Redirect controller for handling short code redirection
const redirectToLongUrl = async (req, res, next) => {
    try {
        const { shortCode } = req.params;
        const link = await (0, links_services_1.getLinkByShortCode)(shortCode);
        return res.redirect(link.longUrl);
    }
    catch (error) {
        next(error);
    }
};
exports.redirectToLongUrl = redirectToLongUrl;
//# sourceMappingURL=links.contoller.js.map