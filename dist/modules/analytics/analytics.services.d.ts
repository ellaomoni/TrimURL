type TrackClickInput = {
    shortLinkId: string;
    ipAddress?: string | null;
    userAgent?: string | null;
    referrer?: string | null;
};
export declare const trackClickEvent: (payload: TrackClickInput) => Promise<any>;
export declare const getLinkAnalytics: (userId: string, linkId: string) => Promise<{
    summary: {
        totalClicks: any;
    };
    link: any;
    recentClicks: any;
    clicksOverTime: {
        date: string;
        count: number;
    }[];
}>;
export {};
//# sourceMappingURL=analytics.services.d.ts.map