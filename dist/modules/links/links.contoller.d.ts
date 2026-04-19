import { NextFunction, Response, Request } from "express";
import { AuthenticatedRequest } from "../../middleware/auth";
export declare const createLink: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const getLinks: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const getLinkById: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const deleteLink: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const redirectToLongUrl: (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=links.contoller.d.ts.map