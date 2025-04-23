import type { Timestamp } from "firebase/firestore";
import type { Payload } from "@/core/types";

export interface ScorePayload extends Payload
{
    username?: string;
    level?: string;
    value: number;
}

export interface UserScore
{
    userId: string;
    username: string;
    value: number;
    payload: Payload;
    timestamp: Timestamp;
}
export interface RawScore extends UserScore
{
    level: string | null;
    version: number;
}

export interface RankedScore extends UserScore
{
    rank: number;
}
export interface BestScore extends RankedScore
{
    lastUpdate: Timestamp;
}

export interface Leaderboard
{
    scores: RankedScore[];
    lastUpdate: Timestamp;
    version: number;
}

export interface JsonScore
{
    userId: string;
    username: string;
    rank: number;
    value: number;
    payload: Payload;
    timestamp: string;
}
export interface JsonLeaderboard
{
    lastUpdate: string;
    scores: JsonScore[];
    user: JsonScore;
}
