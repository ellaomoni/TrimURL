"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAnalyticsForLink = void 0;
const appErrors_1 = require("../../utils/appErrors");
const analytics_services_1 = require("../analytics/analytics.services");
const getAnalyticsForLink = async (req, res, next) => {
    try {
        if (!req.user?.userId) {
            throw new appErrors_1.AppError("Unauthorized", 401);
        }
        const linkId = req.params.linkId;
        if (!linkId || Array.isArray(linkId)) {
            throw new appErrors_1.AppError("Invalid link ID", 400);
        }
        const analytics = await (0, analytics_services_1.getLinkAnalytics)(req.user.userId, linkId);
        res.status(200).json({
            success: true,
            message: "Link analytics fetched successfully",
            data: analytics,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getAnalyticsForLink = getAnalyticsForLink;
//# sourceMappingURL=analytics.controller.js.map