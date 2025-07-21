
import { TimedPromise } from "@byloth/core";

import { onSnapshot } from "firebase/firestore";
import type { DocumentData, DocumentReference, DocumentSnapshot, Unsubscribe } from "firebase/firestore";

import { NoOp } from "./utils";

export async function onUpdate<T, D extends DocumentData = T extends DocumentData ? T : never>(
    documentRef: DocumentReference<T, D>, timeout = 5000): Promise<DocumentSnapshot<T, D>>
{
    let unsubscribe: Unsubscribe = NoOp;

    try
    {
        let isInitialSnapshot = true;

        return await new TimedPromise<DocumentSnapshot<T, D>>((resolve) =>
        {
            unsubscribe = onSnapshot(documentRef, (snapshot): void =>
            {
                if (!(isInitialSnapshot)) { return resolve(snapshot); }

                isInitialSnapshot = false;
            });

        }, timeout);
    }
    finally
    {
        unsubscribe();
    }
}
