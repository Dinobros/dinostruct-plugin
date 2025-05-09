import type { Timestamp } from "firebase/firestore";

export interface UserPayload
{
    emailAddress?: string;
    username?: string;
}
export interface AccountPayload extends UserPayload
{
    provider: "anonymous" | "emailAddress";
}
export interface UserRecord extends AccountPayload
{
    timestamp: Timestamp;
    version: number;
}

export interface UserProperty<T extends number | string = number | string>
{
    value: T;
    timestamp: Timestamp;
    version: number;
}
