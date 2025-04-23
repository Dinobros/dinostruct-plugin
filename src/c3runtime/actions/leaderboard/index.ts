import { doc, getDoc } from "firebase/firestore";
import { DocumentReference } from "firebase/firestore";

import DinostructC3Conditions from "@/c3runtime/conditions";
import { DinostructException, DinostructExceptionCode } from "@/exceptions";
import { computeUsername, formatTimestamp } from "@/core/utils";

import type Dinostruct from "../../instance";
import { saveScore } from "./core";
import type { BestScore, JsonLeaderboard, Leaderboard } from "./types";

export async function LoadLeaderboard(
    this: Dinostruct, jsonRef: IObjectClass<IJSONInstance>, level: string | null = null
): Promise<void>
{
    try
    {
        if (!(this._user)) { throw new DinostructException(DinostructExceptionCode.NotAuthenticated); }

        const leaderboardRef = doc(this.firestore, "leaderboards", level ?? "global") as
            DocumentReference<Leaderboard, Leaderboard>;

        const leaderboardDoc = await getDoc(leaderboardRef);
        if (!(leaderboardDoc.exists()))
        {
            throw new DinostructException(DinostructExceptionCode.LeaderboardNotFound);
        }

        const leaderboard = leaderboardDoc.data();

        const userId = this._user.uid;
        const username = computeUsername(userId, this._userStore!.username);

        const jsonLeaderboard: JsonLeaderboard = {
            lastUpdate: formatTimestamp(leaderboard.lastUpdate),
            scores: leaderboard.scores.map((score) => ({
                ...score,

                timestamp: formatTimestamp(score.timestamp)
            })),
            user: {
                userId: userId,
                username: username,
                rank: -1,
                value: 0,
                payload: { },
                timestamp: "--/--/-- --:--:--"
            }
        };

        const bestScoreRef = doc(leaderboardRef, "bestScores", userId) as DocumentReference<BestScore, BestScore>;
        const bestScoreDoc = await getDoc(bestScoreRef);
        if (bestScoreDoc.exists())
        {
            const bestScore = bestScoreDoc.data();

            jsonLeaderboard.user = {
                ...bestScore,

                timestamp: formatTimestamp(bestScore.timestamp)
            };
        }

        const jsonObj = jsonRef.getFirstPickedInstance()!;
        jsonObj.setJsonDataCopy(jsonLeaderboard);

        // eslint-disable-next-line no-console
        console.debug("Leaderboard loaded successfully. Let's go! 🏆");

        this._trigger(DinostructC3Conditions.TriggerOnLeaderboardLoaded);
    }
    catch (error)
    {
        this.handleError(error);
    }
}

export async function SaveScore(this: Dinostruct, score: number, payload?: IObjectClass<IJSONInstance>, empty = false)
    : Promise<void>
{
    try
    {
        if (!(this._user)) { throw new DinostructException(DinostructExceptionCode.NotAuthenticated); }

        let _payload: JSONObject;
        if (payload)
        {
            const jsonObj = payload.getFirstPickedInstance()!;

            _payload = jsonObj.getJsonDataCopy();
            if (empty) { jsonObj.setJsonDataCopy({ }); }
        }
        else { _payload = { }; }

        await saveScore(this.firestore, this._user.uid, {
            ..._payload,

            username: this._userStore!.username,
            value: score
        });

        // eslint-disable-next-line no-console
        console.info("Score saved successfully. TOP! 🔝");

        this._trigger(DinostructC3Conditions.TriggerOnScoreSaved);
    }
    catch (error)
    {
        this.handleError(error);
    }
}
