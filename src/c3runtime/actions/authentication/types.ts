import type { Timestamp } from "firebase/firestore";

export interface UserPayload
{
    email?: string;
    username?: string;
}
export interface AccountPayload extends UserPayload
{
    provider: "anonymous" | "email";
}

export interface UserStore extends AccountPayload
{
    payload: Record<string, Partial<unknown>>;
    timestamp: Timestamp;
    version: number;
}
