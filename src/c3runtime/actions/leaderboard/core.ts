import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import type { CollectionReference, Firestore } from "firebase/firestore";

import type { RawScore, ScorePayload } from "./types";
import { computeUsername } from "@/core/utils";

export const RAW_SCORES_VERSION = 2;
export const LEADERBOARD_VERSION = 2;

export async function saveScore(firestore: Firestore, userId: string, score: ScorePayload): Promise<void>
{
    const { username, level, value, ...payload } = score;
    const _username = computeUsername(userId, username);

    const rawScoresRef = collection(firestore, "rawScore") as CollectionReference<RawScore, RawScore>;
    await addDoc(rawScoresRef, {
        userId: userId,
        username: _username,
        level: level ?? null,
        value: value,
        payload: payload,
        timestamp: serverTimestamp(),
        version: RAW_SCORES_VERSION
    });
}
