import { TimedPromise, TimeoutException } from "@byloth/core";
import { initializeApp } from "firebase/app";
import type { FirebaseApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import type { Auth, User } from "firebase/auth";

import { addDoc, collection, doc, getDoc, getFirestore, serverTimestamp } from "firebase/firestore";
import type { DocumentReference, Firestore } from "firebase/firestore";

import { v4 as uuid4 } from "uuid";

import { DinostructException, DinostructExceptionCode } from "@/exceptions";

import Configs from "@/core/configs";
import type { Payload } from "@/core/types";

import DinostructC3Conditions from "../conditions";
import type { UserStore } from "../actions/authentication/types";
import type { FirestoreRawEvent, RawEvent } from "./types";

export const LOG_EVENT_VERSION = 2;

export default class DinostructC3Instance extends globalThis.ISDKInstanceBase
{
    public static readonly Version = "0.1.0";

    protected _initialized: boolean;

    protected _isNewDevice: boolean;
    protected _isNewUser: boolean;

    protected _deviceId: string;
    protected _sessionId: string;

    protected _onDomMessage = (message: unknown): void =>
    {
        try
        {
            if (!(message instanceof Object) || !("action" in message))
            {
                throw new DinostructException(DinostructExceptionCode.ImplementationError);
            }

            switch (message.action)
            {
                default:
                    throw new DinostructException(DinostructExceptionCode.ImplementationError);
            }
        }
        catch (error)
        {
            this.handleError(error);
        }
    };

    public readonly configs: Configs;

    protected _firebase?: FirebaseApp;
    public get firebaseAuth(): Auth { throw new DinostructException(DinostructExceptionCode.NotInitialized); }
    public get firestore(): Firestore { throw new DinostructException(DinostructExceptionCode.NotInitialized); }

    protected _user: User | null;
    protected _userStore: UserStore | null;

    protected _lastKeys: Map<string, unknown>;

    public get lastErrorCode(): DinostructExceptionCode
    {
        return this._lastKeys.get("error:code") as DinostructExceptionCode;
    }
    public get lastUserPropertySet(): string
    {
        return this._lastKeys.get("user:property:set") as string;
    }

    public readonly handleError = (error: unknown) =>
    {
        // eslint-disable-next-line no-console
        console.error(error);

        const code = (error instanceof DinostructException) ? error.code : DinostructExceptionCode.UnknownError;
        this._lastKeys.set("error:code", code);

        this._trigger(DinostructC3Conditions.TriggerOnError);
    };

    public readonly logEvent: (type: string, payload?: Payload, checkUser?: boolean) => Promise<void>;

    public constructor()
    {
        super({ domComponentId: "dinobros-dinostruct_plugin-dom_handler" });

        this._initialized = false;

        this._isNewDevice = false;
        this._isNewUser = false;

        this._deviceId = "";
        this._sessionId = "";

        this._user = null;
        this._userStore = null;

        this._lastKeys = new Map();

        this.logEvent = async () => { /* ... */ };

        this.configs = new Configs(this._getInitProperties());
        if (this.configs.autoInitialize)
        {
            this.runtime.addEventListener("beforeprojectstart", async () =>
            {
                try
                {
                    await this.initialize();

                    // eslint-disable-next-line no-console
                    console.info(`Dinostruct (v${DinostructC3Instance.Version})` +
                        ` automatically initialized successfully. RAAAWR! 🦖`);

                    this._trigger(DinostructC3Conditions.TriggerOnInitialized);
                }
                catch (error)
                {
                    this.handleError(error);
                }
            });
        }

        this._addDOMMessageHandler("dinobros:dinostruct:dom", this._onDomMessage);
    }

    protected async _getUserStore(): Promise<UserStore>
    {
        const userRef = doc(this.firestore, "users", this._user!.uid) as DocumentReference<UserStore, UserStore>;
        const userDoc = await getDoc(userRef);

        if (!(userDoc.exists())) { throw new DinostructException(DinostructExceptionCode.ImplementationError); }
        return userDoc.data();
    }

    protected async _initializeIds(): Promise<void>
    {
        let deviceId = await this.runtime.storage.getItem("dinostruct:internal:deviceId") as string;
        if (!(deviceId))
        {
            this._isNewDevice = true;

            deviceId = uuid4();
            await this.runtime.storage.setItem("dinostruct:internal:deviceId", deviceId);
        }

        this._deviceId = deviceId;
        this._sessionId = uuid4();
    }
    protected _initializeFirebase(): Promise<void>
    {
        const firebaseOptions = this.configs.firebase.getOptions();

        this._firebase = initializeApp(firebaseOptions);

        Object.defineProperty(this, "firebaseAuth", { value: getAuth(this._firebase) });
        Object.defineProperty(this, "firestore", { value: getFirestore(this._firebase) });

        return new TimedPromise<void>((resolve, reject) =>
        {
            const unsubscribe = this.firebaseAuth.onAuthStateChanged(async (user: User | null) =>
            {
                try
                {
                    if (user)
                    {
                        this._user = user;
                        this._userStore = await this._getUserStore();

                        // eslint-disable-next-line no-console
                        console.info(`Logged in as an existing anonymous user. Sssh! 🤫`);
                    }

                    resolve();
                }
                catch (error) { reject(error); }
                finally { unsubscribe(); }
            });

        }, this.configs.timeout);
    }

    protected _getLogEventFn(): (type: string, payload?: Payload, checkUser?: boolean) => Promise<void>
    {
        if (this.configs.eventLoggingEndpoint)
        {
            return async (type: string, payload: Payload = { }, checkUser = true) =>
            {
                const rawEvent: RawEvent = {
                    type: type,
                    payload: payload,

                    deviceId: this._deviceId,
                    sessionId: this._sessionId
                };

                const user = this.firebaseAuth.currentUser;
                if (user) { rawEvent.userId = user.uid; }
                else if (checkUser)
                {
                    // eslint-disable-next-line no-console
                    return console.error(new DinostructException(DinostructExceptionCode.NotAuthenticated));
                }

                try
                {
                    const response = await fetch(this.configs.eventLoggingEndpoint, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(rawEvent)
                    });

                    if (!(response.ok))
                    {
                        const cause = `POST ${this.configs.eventLoggingEndpoint} ` +
                            `${response.status} ${response.statusText}`;

                        // eslint-disable-next-line no-console
                        return console.error(new DinostructException(DinostructExceptionCode.RequestError, cause));
                    }
                }
                catch (error)
                {
                    // eslint-disable-next-line no-console
                    return console.error(new DinostructException(DinostructExceptionCode.NetworkError, error));
                }

                // eslint-disable-next-line no-console
                console.debug(`Logged event: "${type}". Uhm? 👀`);
            };
        }

        return async (type: string, payload: Payload = { }, checkUser = true) =>
        {
            const rawEvent: FirestoreRawEvent = {
                type: type,
                payload: payload,

                deviceId: this._deviceId,
                sessionId: this._sessionId,
                timestamp: serverTimestamp()
            };

            const user = this.firebaseAuth.currentUser;
            if (user) { rawEvent.userId = user.uid; }
            else if (checkUser)
            {
                // eslint-disable-next-line no-console
                return console.error(new DinostructException(DinostructExceptionCode.NotAuthenticated));
            }

            const eventsRef = collection(this.firestore, "rawEvents");

            try
            {
                await addDoc(eventsRef, rawEvent);
            }
            catch (error)
            {
                // eslint-disable-next-line no-console
                return console.error(new DinostructException(DinostructExceptionCode.NotAuthorized, error));
            }

            // eslint-disable-next-line no-console
            console.debug(`Logged event: "${type}". Uhm? 👀`);
        };
    }

    protected async _logInitEvent(): Promise<void>
    {
        const [ipAddress, browser] = await Promise.all([
            fetch("https://api.ipify.org/").then((response) => response.text()),
            this._postToDOMAsync("dinobros:dinostruct:runtime", { action: "browser:info" })
        ]);

        const payload = {
            ...browser as JSONObject,

            ipAddress: ipAddress,
            version: LOG_EVENT_VERSION
        };

        await this.logEvent("game:init", payload, false);
    }

    public async initialize(): Promise<void>
    {
        if (this._initialized)
        {
            throw new DinostructException(DinostructExceptionCode.AlreadyInitialized);
        }

        await this._initializeIds();
        await this._initializeFirebase()
            .catch((error) =>
            {
                if (error instanceof TimeoutException)
                {
                    throw new DinostructException(DinostructExceptionCode.TimeoutError, error);
                }

                throw error;
            });

        if (this.configs.enableEventLogging)
        {
            Object.defineProperty(this, "logEvent", { value: this._getLogEventFn() });

            this._logInitEvent();
        }

        this._initialized = true;
    }
}
