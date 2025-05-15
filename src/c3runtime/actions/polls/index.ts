import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import type { CollectionReference } from "firebase/firestore";

import { DinostructException, DinostructExceptionCode } from "@/exceptions";

import DinostructC3Conditions from "../../conditions";
import Dinostruct from "../../instance";

import { POLL_ANSWERS_VERSION } from "./core";
import type { PollAnswer } from "./types";

export async function SubmitPollAnswer(
    this: Dinostruct, questionId: number, answer: number | string, payload?: IObjectClass<IJSONInstance>, empty = false
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

        const pollAnswersRef = collection(this.firestore, "pollAnswers") as CollectionReference<PollAnswer, PollAnswer>;
        await addDoc(pollAnswersRef, {
            userId: this._user!.uid,
            questionId: questionId,
            value: answer,
            payload: _payload,
            timestamp: serverTimestamp(),
            version: POLL_ANSWERS_VERSION
        });

        // eslint-disable-next-line no-console
        console.info("Poll answer submitted successfully. What a great choice! 🗳️");

        this._trigger(DinostructC3Conditions.TriggerOnPollAnswerSubmitted);
    }
    catch (error)
    {
        this.handleError(error);
    }
}
