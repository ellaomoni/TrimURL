type CreateLinkInput = {
    longUrl: string;
    customAlias?: string;
    expiresAt?: string;
};
export declare const createShortLink: (userId: string, payload: CreateLinkInput) => Promise<{
    shortUrl: string;
    id: string;
    longUrl: string;
    shortCode: string;
    customAlias: string | null;
    expiresAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const getUserLinks: (userId: string, page?: number, limit?: number) => Promise<{
    items: any;
    meta: {
        total: any;
        page: number;
        limit: number;
        totalPages: number;
    };
}>;
export declare const getSingleUserLink: (userId: string, linkId: string) => Promise<{
    shortUrl: string;
    id: string;
    longUrl: string;
    shortCode: string;
    customAlias: string | null;
    expiresAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const deleteUserLink: (userId: string, linkId: string) => Promise<{
    id: any;
    message: string;
}>;
export declare const getLinkByShortCode: (shortCode: string) => Promise<any>;
export {};
//# sourceMappingURL=links.services.d.ts.map