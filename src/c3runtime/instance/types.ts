import type { FieldValue } from "firebase/firestore";
import type { Payload } from "@/core/types";

export interface RawEvent
{
    type: string;
    payload: Payload;
    deviceId: string;
    sessionId: string;
    userId?: string;
}

export interface FirestoreRawEvent extends RawEvent
{
    timestamp: FieldValue;
}
