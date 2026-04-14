import type { NextFunction, Request, Response } from "express";
type ErrorWithStatus = Error & {
    statusCode?: number;
};
export declare function errorHandler(err: ErrorWithStatus, _req: Request, res: Response, _next: NextFunction): void;
export {};
//# sourceMappingURL=errorHandler.d.ts.map