import type { Timestamp } from "firebase/firestore";

export interface UserPayload extends Record<string, unknown>
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
    timestamp: Timestamp;
}
