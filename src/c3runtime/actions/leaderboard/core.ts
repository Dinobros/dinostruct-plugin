import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import type { CollectionReference, Firestore } from "firebase/firestore";

import type { RawScore, ScorePayload } from "./types";

export const RAW_SCORES_VERSION = 2;
export const LEADERBOARD_VERSION = 2;

export async function saveScore(firestore: Firestore, userId: string, score: ScorePayload): Promise<void>
{
    const { username, level, value, ...payload } = score;

    const rawScoresRef = collection(firestore, "rawScores") as CollectionReference<RawScore, RawScore>;
    await addDoc(rawScoresRef, {
        userId: userId,
        username: username!,
        level: level ?? null,
        value: value,
        payload: payload,
        timestamp: serverTimestamp(),
        version: RAW_SCORES_VERSION
    });
}
