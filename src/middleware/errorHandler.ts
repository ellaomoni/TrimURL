import type { NextFunction, Request, Response } from "express";

type ErrorWithStatus = Error & {
  statusCode?: number;
};

export function errorHandler(
  err: ErrorWithStatus,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  const statusCode = err.statusCode ?? 500;

  res.status(statusCode).json({
    message: err.message || "Internal server error",
  });
}
