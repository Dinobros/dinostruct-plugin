import { createUserWithEmailAndPassword, signInAnonymously, signInWithEmailAndPassword } from "firebase/auth";
import { doc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import type { DocumentReference } from "firebase/firestore";

import DinostructC3Conditions from "@/c3runtime/conditions";
import { DinostructException, DinostructExceptionCode } from "@/exceptions";

import type Dinostruct from "../../instance";
import { createUserRecord, handleAuthError, USER_PROPERTIES_VERSION } from "./core";
import type { AccountPayload, UserProperty, UserRecord } from "./types";

export async function LogInAnonymously(this: Dinostruct): Promise<void>
{
    try
    {
        if (this._user) { throw new DinostructException(DinostructExceptionCode.AlreadyAuthenticated); }
        const { user } = await signInAnonymously(this.firebaseAuth)
            .catch(handleAuthError);

        this._isNewUser = true;
        this._user = user;

        const account = { provider: "anonymous", username: this.username } satisfies AccountPayload;
        await createUserRecord(this.firestore, user.uid, account, true);

        // eslint-disable-next-line no-console
        console.info(`Logged in as a new anonymous user. Sssh! 🤫`);

        this._trigger(DinostructC3Conditions.TriggerOnUserLogin);
    }
    catch (error)
    {
        this.handleError(error);
    }
}
export async function LogInWithCredentials(this: Dinostruct, emailAddress: string, password: string): Promise<void>
{
    try
    {
        if (this._user) { throw new DinostructException(DinostructExceptionCode.AlreadyAuthenticated); }
        const { user } = await signInWithEmailAndPassword(this.firebaseAuth, emailAddress, password)
            .catch(handleAuthError);

        await this.refreshUser(user);

        // eslint-disable-next-line no-console
        console.info(`Logged in with email and password. Welcome back! 🥳`);

        const account = { provider: "emailAddress" } satisfies AccountPayload;
        this.logEvent("user:login", account);

        this._trigger(DinostructC3Conditions.TriggerOnUserLogin);
    }
    catch (error)
    {
        this.handleError(error);
    }
}

export async function RegisterWithCredentials(this: Dinostruct, emailAddress: string, password: string): Promise<void>
{
    try
    {
        if (this._user) { throw new DinostructException(DinostructExceptionCode.AlreadyAuthenticated); }
        const { user } = await createUserWithEmailAndPassword(this.firebaseAuth, emailAddress, password)
            .catch(handleAuthError);

        this._isNewUser = true;
        this._user = user;

        const username = emailAddress.split("@")[0];
        const account = {
            provider: "emailAddress",
            emailAddress: emailAddress,
            username: username

        } satisfies AccountPayload;

        await createUserRecord(this.firestore, user.uid, account, true);

        // eslint-disable-next-line no-console
        console.info(`Registered with email and password. Nice to meet you! 🤝`);

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

        await this.refreshUser(user);

        // eslint-disable-next-line no-console
        console.debug(`User data has been refreshed. Sooo fresh! 🍃`);

        this._trigger(DinostructC3Conditions.TriggerOnUserRefresh);
    }
    catch (error)
    {
        this.handleError(error);
    }
}

export async function SetUsername(this: Dinostruct, username: string): Promise<void>
{
    try
    {
        if (!(this._user)) { throw new DinostructException(DinostructExceptionCode.NotAuthenticated); }

        const userRef = doc(this.firestore, "users", this._user.uid) as DocumentReference<UserRecord, UserRecord>;
        await updateDoc(userRef, { username });

        this._username = username;

        // eslint-disable-next-line no-console
        console.debug(`The username has been set to "${username}". Noice! 😌`);

        this._trigger(DinostructC3Conditions.TriggerOnUserPropertySet);
    }
    catch (error)
    {
        this.handleError(error);
    }
}
export async function SetEmail(this: Dinostruct, emailAddress: string): Promise<void>
{
    try
    {
        if (!(this._user)) { throw new DinostructException(DinostructExceptionCode.NotAuthenticated); }

        const userRef = doc(this.firestore, "users", this._user.uid) as DocumentReference<UserRecord, UserRecord>;
        await updateDoc(userRef, { emailAddress });

        this._emailAddress = emailAddress;

        // eslint-disable-next-line no-console
        console.debug(`The email address has been set to "${emailAddress}". Sweet! 🍭`);

        this._trigger(DinostructC3Conditions.TriggerOnUserPropertySet);
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

        const userPropertyRef = doc(this.firestore, "users", this._user.uid, "properties", property) as
            DocumentReference<UserProperty, UserProperty>;

        await setDoc(userPropertyRef, {
            value: value,
            timestamp: serverTimestamp(),
            version: USER_PROPERTIES_VERSION
        });

        this._lastKeys.set("user:property:set", property);

        // eslint-disable-next-line no-console
        console.debug(`The user property "${property}" has been set. Gotcha! 🧠`);

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
        this._userProperties = { };

        // eslint-disable-next-line no-console
        console.info("The user has been logged out. See ya! 👋");

        this._trigger(DinostructC3Conditions.TriggerOnUserLogout);
    }
    catch (error)
    {
        this.handleError(error);
    }
}
