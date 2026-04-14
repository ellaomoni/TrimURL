import { NextFunction, Request, Response } from "express";
export interface AuthenticatedRequest extends Request {
    user?: {
        userId: string;
        email: string;
    };
}
export declare const authMiddleware: (req: AuthenticatedRequest, _res: Response, next: NextFunction) => void;
//# sourceMappingURL=auth.d.ts.map