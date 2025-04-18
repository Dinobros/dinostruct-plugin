import { TimeUnit } from "@byloth/core";

import { signInAnonymously } from "firebase/auth";
import { doc, DocumentReference, Timestamp, updateDoc } from "firebase/firestore";

import DinostructC3Conditions from "@/c3runtime/conditions";
import { DinostructException, DinostructExceptionCode } from "@/exceptions";

import type Dinostruct from "../../instance";
import { createUserStore } from "./core";
import type { AccountPayload, UserStore } from "./types";

export async function LogInAnonymously(this: Dinostruct, username: string): Promise<void>
{
    try
    {
        if (this._user) { throw new DinostructException(DinostructExceptionCode.AlreadyAuthenticated); }
        const { user } = await signInAnonymously(this.firebaseAuth);

        const account = { provider: "anonymous", username: username } satisfies AccountPayload;
        await createUserStore(this.firestore, user.uid, account, true);

        this._isNewUser = true;

        this._user = user;
        this._userStore = {
            ...account,

            payload: { },
            timestamp: new Timestamp(Date.now() / TimeUnit.Second, 0),
            version: 2
        };

        // eslint-disable-next-line no-console
        console.info(`Logged in as a new anonymous user. SSSH! 🕵️`);

        this._trigger(DinostructC3Conditions.TriggerOnUserLogin);
    }
    catch (error)
    {
        this.handleError(error);
    }
}

export async function RefreshUser(this: Dinostruct): Promise<void>
{
    try
    {
        const user = this.firebaseAuth.currentUser;
        if (!(user)) { throw new DinostructException(DinostructExceptionCode.NotAuthenticated); }

        this._user = user;
        this._userStore = await this._getUserStore();

        // eslint-disable-next-line no-console
        console.debug(`User data has been refreshed. Chill! 🥶`);

        this._trigger(DinostructC3Conditions.TriggerOnUserRefresh);
    }
    catch (error)
    {
        this.handleError(error);
    }
}
export async function SetUserProperty(this: Dinostruct, property: string, value: number | string): Promise<void>
{
    try
    {
        if (!(this._user)) { throw new DinostructException(DinostructExceptionCode.NotAuthenticated); }

        const payload = this._userStore!.payload;
        payload[property] = value;

        const userRef = doc(this.firestore, "users", this._user.uid) as DocumentReference<UserStore, UserStore>;
        await updateDoc(userRef, { payload });

        this._lastKeys.set("user:property:set", property);

        // eslint-disable-next-line no-console
        console.debug(`User property "${property}" has been stored. Gotcha! 🧠`);

        this._trigger(DinostructC3Conditions.TriggerOnUserPropertySet);
    }
    catch (error)
    {
        this.handleError(error);
    }
}

export async function LogOut(this: Dinostruct): Promise<void>
{
    try
    {
        if (!(this._user)) { throw new DinostructException(DinostructExceptionCode.NotAuthenticated); }

        await this.firebaseAuth.signOut();

        this._isNewUser = false;

        this._user = null;
        this._userStore = null;

        // eslint-disable-next-line no-console
        console.info("The user has been logged out. Bye! 👋");

        this._trigger(DinostructC3Conditions.TriggerOnUserLogout);
    }
    catch (error)
    {
        this.handleError(error);
    }
}
