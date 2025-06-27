export interface saveTokenDataType {
    token: string | null;
    user: {
        id: string | null;
        name: string | null;
        email: string | null;
        role: string | null;
        store_id: string | null;
        phone: string | null;
        is_subscribed?: string | null;
    };
}