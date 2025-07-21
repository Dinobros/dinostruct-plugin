import { FirebaseError } from "firebase/app";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import type { DocumentReference } from "firebase/firestore";

import type Dinostruct from "@/c3runtime/instance";
import { DinostructException, DinostructExceptionCode, UserAlreadyExistsException } from "@/exceptions";
import type { AccountPayload, UserRecord } from "./types";

export const USERS_VERSION = 2;
export const USER_PROPERTIES_VERSION = 1;

export async function createUserRecord({ firestore, user }: Dinostruct, payload: AccountPayload, throwIfExists = true)
    : Promise<void>
{
    const userRef = doc(firestore, "users", user!.uid) as DocumentReference<UserRecord, UserRecord>;
    const userDoc = await getDoc(userRef);
    if (!(userDoc.exists()))
    {
        return setDoc<UserRecord, UserRecord>(userRef, {
            ...payload,

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
