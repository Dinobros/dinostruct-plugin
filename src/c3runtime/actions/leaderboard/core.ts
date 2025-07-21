import { addDoc, collection, doc, serverTimestamp } from "firebase/firestore";
import type { CollectionReference, DocumentReference } from "firebase/firestore";

import { onUpdate } from "@/core/firestore";
import type Dinostruct from "@/c3runtime/instance";

import type { BestScore, Leaderboard, RawScore, ScorePayload } from "./types";

export const DEFAULT_LEVEL = "global";

export const RAW_SCORES_VERSION = 2;
export const LEADERBOARD_VERSION = 2;

export async function onLeaderboardUpdate({ firestore, user, configs }: Dinostruct, level = DEFAULT_LEVEL)
    : Promise<void>
{
    const leaderboardRef = doc(firestore, "leaderboards", level) as DocumentReference<Leaderboard>;
    const bestScoreRef = doc(leaderboardRef, "bestScores", user!.uid) as DocumentReference<BestScore>;

    await Promise.any([
        onUpdate(leaderboardRef, configs.timeout),
        onUpdate(bestScoreRef, configs.timeout)
    ]);
}

export async function saveScore({ firestore, user }: Dinostruct, score: ScorePayload): Promise<void>
{
    const { username, level, value, ...payload } = score;

    const rawScoresRef = collection(firestore, "rawScores") as CollectionReference<RawScore, RawScore>;
    await addDoc(rawScoresRef, {
        userId: user!.uid,
        username: username!,
        level: level ?? null,
        value: value,
        payload: payload,
        timestamp: serverTimestamp(),
        version: RAW_SCORES_VERSION
    });
}
