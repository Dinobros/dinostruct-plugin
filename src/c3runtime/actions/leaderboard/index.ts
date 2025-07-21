import { doc, getDoc } from "firebase/firestore";
import { DocumentReference } from "firebase/firestore";

import DinostructC3Conditions from "@/c3runtime/conditions";
import { DinostructException, DinostructExceptionCode } from "@/exceptions";
import { formatTimestamp } from "@/core/utils";

import type Dinostruct from "../../instance";
import { DEFAULT_LEVEL, onLeaderboardUpdate, saveScore } from "./core";
import type { BestScore, JsonLeaderboard, Leaderboard } from "./types";

async function __LoadLeaderboard__(this: Dinostruct, jsonRef: IObjectClass<IJSONInstance>, level = DEFAULT_LEVEL)
    : Promise<void>
{
    try
    {
        if (!(this._user)) { throw new DinostructException(DinostructExceptionCode.NotAuthenticated); }

        const leaderboardRef = doc(this.firestore, "leaderboards", level) as
            DocumentReference<Leaderboard, Leaderboard>;

        const leaderboardDoc = await getDoc(leaderboardRef);
        if (!(leaderboardDoc.exists()))
        {
            throw new DinostructException(DinostructExceptionCode.LeaderboardNotFound);
        }

        const leaderboard = leaderboardDoc.data();

        const userId = this._user.uid;
        const jsonLeaderboard: JsonLeaderboard = {
            lastUpdate: formatTimestamp(leaderboard.lastUpdate),
            scores: leaderboard.scores.map((score) => ({
                ...score,

                timestamp: formatTimestamp(score.timestamp)
            })),
            user: {
                userId: userId,
                username: this.username,
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
        console.debug("Leaderboard loaded successfully. Whose crown is this? 👑");

        this._trigger(DinostructC3Conditions.TriggerOnLeaderboardLoaded);
    }
    catch (error)
    {
        this.handleError(error, "LoadLeaderboard");
    }
}

export function LoadLeaderboard(this: Dinostruct, jsonRef: IObjectClass<IJSONInstance>, level = DEFAULT_LEVEL)
    : Promise<void>
{
    return __LoadLeaderboard__.call(this, jsonRef, level);
}

async function __SaveScore__(
    this: Dinostruct,
    level: string,
    score: number,
    payload?: IObjectClass<IJSONInstance>,
    empty = false

): Promise<void>
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

        await saveScore(this, {
            ..._payload,

            username: this.username,
            level: level,
            value: score
        });

        // eslint-disable-next-line no-console
        console.debug("Score saved successfully. Who's your daddy? 😏");

        this._trigger(DinostructC3Conditions.TriggerOnScoreSaved);
    }
    catch (error)
    {
        this.handleError(error, "SaveScore");
    }
}

export function SaveScore(this: Dinostruct, score: number, payload?: IObjectClass<IJSONInstance>, empty = false)
    : Promise<void>
{
    return __SaveScore__.call(this, DEFAULT_LEVEL, score, payload, empty);
}
export function SaveLevelScore(
    this: Dinostruct, level: string, score: number, payload?: IObjectClass<IJSONInstance>, empty = false
): Promise<void>
{
    return __SaveScore__.call(this, level, score, payload, empty);
}

export async function SaveScoreAndLoadLeaderboard(
    this: Dinostruct,
    score: number,
    jsonRef: IObjectClass<IJSONInstance>,
    payload?: IObjectClass<IJSONInstance>,
    empty = false

): Promise<void>
{
    await __SaveScore__.call(this, DEFAULT_LEVEL, score, payload, empty);

    try
    {
        await onLeaderboardUpdate(this, DEFAULT_LEVEL);
    }
    catch (error)
    {
        // eslint-disable-next-line no-console
        console.warn(error);
    }

    await __LoadLeaderboard__.call(this, jsonRef, DEFAULT_LEVEL);
}
export async function SaveLevelScoreAndLoadLeaderboard(
    this: Dinostruct,
    level: string,
    score: number,
    jsonRef: IObjectClass<IJSONInstance>,
    payload?: IObjectClass<IJSONInstance>,
    empty = false

): Promise<void>
{
    await __SaveScore__.call(this, level, score, payload, empty);

    try
    {
        await onLeaderboardUpdate(this, level);
    }
    catch (error)
    {
        // eslint-disable-next-line no-console
        console.warn(error);
    }

    await __LoadLeaderboard__.call(this, jsonRef, level);
}
