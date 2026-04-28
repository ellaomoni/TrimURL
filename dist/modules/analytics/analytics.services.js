"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLinkAnalytics = exports.trackClickEvent = void 0;
const env_1 = require("../../config/env");
const prisma_1 = require("../../config/prisma");
const appErrors_1 = require("../../utils/appErrors");
const trackClickEvent = async (payload) => {
    const { shortLinkId, ipAddress, userAgent, referrer } = payload;
    const clickEvent = await prisma_1.prisma.clickEvent.create({
        data: {
            shortLinkId,
            ipAddress: ipAddress || null,
            userAgent: userAgent || null,
            referrer: referrer || null,
        },
    });
    return clickEvent;
};
exports.trackClickEvent = trackClickEvent;
const getLinkAnalytics = async (userId, linkId) => {
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
            createdAt: true,
        },
    });
    if (!link) {
        throw new appErrors_1.AppError("Link not found", 404);
    }
    const totalClicks = await prisma_1.prisma.clickEvent.count({
        where: {
            shortLinkId: linkId,
        },
    });
    const recentClicks = await prisma_1.prisma.clickEvent.findMany({
        where: {
            shortLinkId: linkId,
        },
        orderBy: {
            clickedAt: "desc",
        },
        take: 10,
        select: {
            id: true,
            ipAddress: true,
            userAgent: true,
            referrer: true,
            clickedAt: true,
        },
    });
    const clicksOverTimeRaw = await prisma_1.prisma.clickEvent.findMany({
        where: {
            shortLinkId: linkId,
        },
        orderBy: {
            clickedAt: "asc",
        },
        select: {
            clickedAt: true,
        },
    });
    const clicksOverTimeMap = {};
    for (const click of clicksOverTimeRaw) {
        const date = click.clickedAt.toISOString().split("T")[0];
        clicksOverTimeMap[date] = (clicksOverTimeMap[date] || 0) + 1;
    }
    const clicksOverTime = Object.entries(clicksOverTimeMap).map(([date, count]) => ({
        date,
        count,
    }));
    return {
        summary: {
            totalClicks,
        },
        link: {
            ...link,
            shortUrl: `${env_1.env.APP_BASE_URL}/links/r/${link.shortCode}`,
        },
        recentClicks,
        clicksOverTime,
    };
};
exports.getLinkAnalytics = getLinkAnalytics;
//# sourceMappingURL=analytics.services.js.map