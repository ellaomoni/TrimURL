import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../../middleware/auth";
import { AppError } from "../../utils/appErrors";
import { getLinkAnalytics } from "../analytics/analytics.services";

export const getAnalyticsForLink = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user?.userId) {
      throw new AppError("Unauthorized", 401);
    }

    const linkId = req.params.linkId;
    if (!linkId || Array.isArray(linkId)) {
      throw new AppError("Invalid link ID", 400);
    }

    const analytics = await getLinkAnalytics(req.user.userId, linkId);

    res.status(200).json({
      success: true,
      message: "Link analytics fetched successfully",
      data: analytics,
    });
  } catch (error) {
    next(error);
  }
};