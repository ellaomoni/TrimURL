type CreateLinkInput = {
    longUrl: string;
    customAlias?: string;
    expiresAt?: string;
};
export declare const createShortLink: (userId: string, payload: CreateLinkInput) => Promise<any>;
export declare const getUserLinks: (userId: string) => Promise<any>;
export declare const getSingleUserLink: (userId: string, linkId: string) => Promise<any>;
export declare const deleteUserLink: (userId: string, linkId: string) => Promise<{
    message: string;
}>;
export {};
//# sourceMappingURL=links.services.d.ts.map