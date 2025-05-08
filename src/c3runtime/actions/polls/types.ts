import type { Timestamp } from "firebase/firestore";
import type { Payload } from "@/core/types";

export interface PollAnswer
{
    userId: string;
    questionId: number;
    value: number | string;
    payload: Payload;
    timestamp: Timestamp;
    version: number;
}
