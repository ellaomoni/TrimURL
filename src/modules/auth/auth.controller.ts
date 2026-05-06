import { NextFunction, Request, Response } from "express";
import {
  getCurrentUser,
  loginUser,
  registerUser,
  verifyUserEmail,
} from "./auth.services";
import { AuthenticatedRequest } from "../../middleware/auth";
import { AppError } from "../../utils/appErrors";


export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await registerUser(req.body);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await loginUser(req.body);

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const me = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user?.userId) {
      throw new AppError("Unauthorized", 401);
    }

    const user = await getCurrentUser(req.user.userId);

    res.status(200).json({
      success: true,
      message: "Current user fetched successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const verifyEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, code } = req.body;

    const user = await verifyUserEmail(email, code);

    res.status(200).json({
      success: true,
      message: "Email verified successfully. You can now log in.",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};