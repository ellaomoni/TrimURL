import { NextFunction, Response } from "express";
import { AuthenticatedRequest } from "../../middleware/auth";
import { AppError } from "../../utils/appErrors";
import {
  createShortLink,
  deleteUserLink,
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