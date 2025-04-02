import { signInAnonymously } from "firebase/auth";
import type { User } from "firebase/auth";

import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import type { Firestore } from "firebase/firestore";

import type Dinostruct from "../../instance";

import type { AccountPayload, UserData, UserPayload } from "./types";
import { UserAlreadyExistsException } from "@/exceptions";

async function _storeUser(
    firestore: Firestore, userId: string, { provider, email, username }: AccountPayload, throwIfExists = true
): Promise<void>
{
    const userRef = doc(firestore, "users", userId);
    const userDoc = await getDoc(userRef);
    if (!(userDoc.exists()))
    {
        const userData: UserData = {
            provider: provider,
            timestamp: serverTimestamp()
        };

        if (email) { userData.email = email; }
        if (username) { userData.username = username; }

        return setDoc(userRef, userData);
    }

    if (throwIfExists)
    {
        throw new UserAlreadyExistsException();
    }
}

export async function logInAnonymously({ firebaseAuth, firestore }: Dinostruct, { email, username }: UserPayload)
    : Promise<User>
{
    const { user } = await signInAnonymously(firebaseAuth);

    // eslint-disable-next-line no-console
    console.info(`Logged in anonymously as ${user.uid}. 🕵️`);

    const payload: AccountPayload = { provider: "anonymous" };

    if (email) { payload.email = email; }
    if (username) { payload.username = username; }

    await _storeUser(firestore, user.uid, payload, true);

    return user;
}
