import { FirebaseError } from "firebase/app";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import type { DocumentReference, Firestore } from "firebase/firestore";

import { DinostructException, DinostructExceptionCode, UserAlreadyExistsException } from "@/exceptions";
import type { AccountPayload, UserStore } from "./types";

export const USERS_VERSION = 2;

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
            version: USERS_VERSION
        });
    }

    if (throwIfExists)
    {
        throw new UserAlreadyExistsException();
    }
}

export function handleAuthError(error: unknown): never
{
    if (error instanceof FirebaseError)
    {
        throw new DinostructException(DinostructExceptionCode.NotAuthenticated, error);
    }

    throw error;
}
