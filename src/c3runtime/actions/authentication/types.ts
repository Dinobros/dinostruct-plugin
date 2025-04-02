import type { FieldValue } from "firebase/firestore";

export interface UserPayload
{
    email?: string;
    username?: string;
}
export interface AccountPayload extends UserPayload
{
    provider: "anonymous" | "email";
}

export interface UserData extends AccountPayload
{
    timestamp: FieldValue;
}
