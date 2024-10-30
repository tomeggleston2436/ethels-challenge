declare global {
    namespace App {
        interface Locals {
            session: {
                data: {
                    accessToken?: string;
                    refreshToken?: string;
                    expiresAt?: number;
                } | null;
            };
        }
    }
}

export {};