import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import type { DocumentReference, Firestore } from "firebase/firestore";

import { UserAlreadyExistsException } from "@/exceptions";
import type { AccountPayload, UserStore } from "./types";

export async function createUserStore(
    firestore: Firestore, userId: string, payload: AccountPayload, throwIfExists = true
): Promise<void>
{
    const userRef = doc(firestore, "users", userId) as DocumentReference<UserStore, UserStore>;
    const userDoc = await getDoc(userRef);
    if (!(userDoc.exists()))
    {
        return setDoc<UserStore, UserStore>(userRef, {
            ...payload,

            payload: { },
            timestamp: serverTimestamp(),
            version: 2
        });
    }

    if (throwIfExists)
    {
        throw new UserAlreadyExistsException();
    }
}
