import { initializeApp } from "firebase/app";
import type { FirebaseApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import type { Auth, User } from "firebase/auth";

import { addDoc, collection, getFirestore, serverTimestamp } from "firebase/firestore";
import type { Firestore } from "firebase/firestore";

import { v4 as uuid4 } from "uuid";

import Configs from "@/models/configs";
import type { Payload, RawEvent } from "@/models";
import type { FirestoreRawEvent } from "@/models/firestore";

import { DinostructException, DinostructExceptionCode } from "@/exceptions";

import DinostructC3Conditions from "./conditions";

export default class DinostructC3Instance extends globalThis.ISDKInstanceBase
{
    public static readonly Version = "0.1.0";

    protected _initialized: boolean;

    protected _deviceId: string;
    protected _sessionId: string;

    protected _isNewDevice: boolean;
    public get isNewDevice(): boolean { return this._isNewDevice; }

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
    public get user(): User | null { return this._user; }

    protected _isNewUser: boolean;
    public get isNewUser(): boolean { return this._isNewUser; }

    protected _lastError?: unknown;
    public get lastError(): unknown { return this._lastError; }

    public readonly handleError = (error: unknown) =>
    {
        // eslint-disable-next-line no-console
        console.error(error);

        this._lastError = error;
        this._trigger(DinostructC3Conditions.TriggerOnError);
    };

    public readonly logEvent: (type: string, payload?: Payload, checkUser?: boolean) => Promise<void>;

    public constructor()
    {
        super({ domComponentId: "dinobros-dinostruct_plugin-dom_handler" });

        this._initialized = false;

        this._deviceId = "";
        this._sessionId = "";
        this._isNewDevice = true;

        this._user = null;
        this._isNewUser = true;

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

    protected async _initializeIds(): Promise<void>
    {
        let deviceId = await this.runtime.storage.getItem("dinostruct:internal:deviceId") as string;
        if (deviceId) { this._isNewDevice = false; }
        else
        {
            deviceId = uuid4();

            await this.runtime.storage.setItem("dinostruct:internal:deviceId", deviceId);
        }

        this._deviceId = deviceId;
        this._sessionId = uuid4();
    }
    protected _initializeFirebase(): void
    {
        const firebaseOptions = this.configs.firebase.getOptions();

        this._firebase = initializeApp(firebaseOptions);

        Object.defineProperty(this, "firebaseAuth", { value: getAuth(this._firebase) });
        Object.defineProperty(this, "firestore", { value: getFirestore(this._firebase) });
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
                console.debug(`Logged event: "${type}" 👀`);
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
            console.debug(`Logged event: "${type}" 👀`);
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
            version: 2
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
        this._initializeFirebase();

        if (this.configs.enableEventLogging)
        {
            Object.defineProperty(this, "logEvent", { value: this._getLogEventFn() });

            this._logInitEvent();
        }

        this._initialized = true;
    }
}
