import { trackClickEvent } from "../analytics/analytics.services";
import { NextFunction, Response, Request } from "express";
import { AuthenticatedRequest } from "../../middleware/auth";
import { AppError } from "../../utils/appErrors";
import {
  createShortLink,
  deleteUserLink,
  getLinkByShortCode,
  getSingleUserLink,
  getUserLinks,
} from "./links.services";

export const createLink = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user?.userId) {
      throw new AppError("Unauthorized", 401);
    }

    const link = await createShortLink(req.user.userId, req.body);

    res.status(201).json({
      success: true,
      message: "Short link created successfully",
      data: link,
    });
  } catch (error) {
    next(error);
  }
};

export const getLinks = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user?.userId) {
      throw new AppError("Unauthorized", 401);
    }

    const links = await getUserLinks(req.user.userId);

    res.status(200).json({
      success: true,
      message: "Links fetched successfully",
      data: links,
    });
  } catch (error) {
    next(error);
  }
};

export const getLinkById = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user?.userId) {
      throw new AppError("Unauthorized", 401);
    }

    const link = await getSingleUserLink(req.user.userId, req.params.id as string);

    res.status(200).json({
      success: true,
      message: "Link fetched successfully",
      data: link,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteLink = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user?.userId) {
      throw new AppError("Unauthorized", 401);
    }

    const result = await deleteUserLink(req.user.userId, req.params.id as string);

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
};

export const redirectToLongUrl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { shortCode } = req.params;

    const link = await getLinkByShortCode(shortCode as string);

    const ipAddress =
      (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
      req.socket.remoteAddress ||
      null;

    const userAgent = req.get("user-agent") || null;
    const referrer = req.get("referer") || null;

    await trackClickEvent({
      shortLinkId: link.id,
      ipAddress,
      userAgent,
      referrer,
    });

    return res.redirect(link.longUrl);
  } catch (error) {
    next(error);
  }
};