type RegisterInput = {
    name: string;
    email: string;
    password: string;
};
type LoginInput = {
    email: string;
    password: string;
};
export declare const registerUser: (payload: RegisterInput) => Promise<{
    user: any;
    token: string;
}>;
export declare const loginUser: (payload: LoginInput) => Promise<{
    user: {
        id: any;
        name: any;
        email: any;
        createdAt: any;
    };
    token: string;
}>;
export declare const getCurrentUser: (userId: string) => Promise<any>;
export {};
//# sourceMappingURL=auth.services.d.ts.map