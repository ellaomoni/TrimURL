"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLinkByShortCode = exports.deleteUserLink = exports.getSingleUserLink = exports.getUserLinks = exports.createShortLink = void 0;
const prisma_1 = require("../../config/prisma");
const appErrors_1 = require("../../utils/appErrors");
const generateShortcodes_1 = require("../../utils/generateShortcodes");
const env_1 = require("../../config/env");
const generateUniqueShortCode = async () => {
    let shortCode = (0, generateShortcodes_1.generateShortCode)(6);
    let existingLink = await prisma_1.prisma.shortLink.findUnique({
        where: { shortCode },
    });
    while (existingLink) {
        shortCode = (0, generateShortcodes_1.generateShortCode)(6);
        existingLink = await prisma_1.prisma.shortLink.findUnique({
            where: { shortCode },
        });
    }
    return shortCode;
};
const formatShortLinkResponse = (link) => {
    return {
        ...link,
        shortUrl: `${env_1.env.APP_BASE_URL}/links/r/${link.shortCode}`,
    };
};
const createShortLink = async (userId, payload) => {
    const { longUrl, customAlias, expiresAt } = payload;
    if (customAlias) {
        const existingAlias = await prisma_1.prisma.shortLink.findFirst({
            where: {
                OR: [{ customAlias }, { shortCode: customAlias }],
            },
        });
        if (existingAlias) {
            throw new appErrors_1.AppError("Custom alias is already in use", 409);
        }
    }
    const shortCode = customAlias || (await generateUniqueShortCode());
    const createdLink = await prisma_1.prisma.shortLink.create({
        data: {
            longUrl,
            shortCode,
            customAlias: customAlias || null,
            expiresAt: expiresAt ? new Date(expiresAt) : null,
            userId,
        },
        select: {
            id: true,
            longUrl: true,
            shortCode: true,
            customAlias: true,
            expiresAt: true,
            createdAt: true,
            updatedAt: true,
            userId: true,
        },
    });
    if (expiresAt && new Date(expiresAt) <= new Date()) {
        throw new appErrors_1.AppError("Expiry date must be in the future", 400);
    }
    return formatShortLinkResponse(createdLink);
};
exports.createShortLink = createShortLink;
const getUserLinks = async (userId, page = 1, limit = 10) => {
    const skip = (page - 1) * limit;
    const [links, total] = await Promise.all([
        prisma_1.prisma.shortLink.findMany({
            where: { userId },
            orderBy: {
                createdAt: "desc",
            },
            skip,
            take: limit,
            select: {
                id: true,
                longUrl: true,
                shortCode: true,
                customAlias: true,
                expiresAt: true,
                createdAt: true,
                updatedAt: true,
            },
        }),
        prisma_1.prisma.shortLink.count({
            where: { userId },
        }),
    ]);
    return {
        items: links.map(formatShortLinkResponse),
        meta: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        },
    };
};
exports.getUserLinks = getUserLinks;
const getSingleUserLink = async (userId, linkId) => {
    const link = await prisma_1.prisma.shortLink.findFirst({
        where: {
            id: linkId,
            userId,
        },
        select: {
            id: true,
            longUrl: true,
            shortCode: true,
            customAlias: true,
            expiresAt: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    if (!link) {
        throw new appErrors_1.AppError("Link not found", 404);
    }
    return formatShortLinkResponse(link);
};
exports.getSingleUserLink = getSingleUserLink;
const deleteUserLink = async (userId, linkId) => {
    const existingLink = await prisma_1.prisma.shortLink.findFirst({
        where: {
            id: linkId,
            userId,
        },
    });
    if (!existingLink) {
        throw new appErrors_1.AppError("Link not found", 404);
    }
    await prisma_1.prisma.shortLink.delete({
        where: {
            id: linkId,
        },
    });
    return {
        id: existingLink.id,
        message: "Link deleted successfully",
    };
};
exports.deleteUserLink = deleteUserLink;
//Redirect function to handles the redirection logic to the original URL when a short URL is accessed.
const getLinkByShortCode = async (shortCode) => {
    const link = await prisma_1.prisma.shortLink.findFirst({
        where: {
            OR: [
                { shortCode },
                { customAlias: shortCode },
            ],
        },
    });
    if (!link) {
        throw new appErrors_1.AppError("Short link not found", 404);
    }
    if (link.expiresAt && new Date(link.expiresAt) < new Date()) {
        throw new appErrors_1.AppError("This short link has expired", 410);
    }
    return link;
};
exports.getLinkByShortCode = getLinkByShortCode;
//# sourceMappingURL=links.services.js.map