import { initializeApp } from "firebase/app";

import type { FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";

import { v4 as uuid4 } from "uuid";

import Configs from "@/models/configs";
import { DinostructException, DinostructExceptionCode } from "@/exceptions";

const C3 = globalThis.C3;

export default class DinostructC3Instance extends globalThis.ISDKInstanceBase
{
    public static readonly Version = "0.1.0";

    protected _initialized: boolean;

    protected _deviceId: string;
    protected _sessionId: string;

    protected _onDomMessage = (message: unknown): void =>
    {
        console.log("Received DOM message: ", message);
    };

    public readonly configs: Configs;

    protected _firebase?: FirebaseApp;
    protected _firestore?: Firestore;
    public get firestore(): Firestore { throw new DinostructException(DinostructExceptionCode.NotInitialized); }

    protected _isReturningUser: boolean;
    public get isReturningUser(): boolean { return this._isReturningUser; }

    protected _lastError?: Error;
    public get lastError(): Error | undefined { return this._lastError; }

    public constructor()
    {
        super({ domComponentId: "dinobros-dinostruct_plugin-dom_handler" });

        this._initialized = false;

        this._deviceId = "";
        this._sessionId = "";

        this._isReturningUser = false;

        this.configs = new Configs(this._getInitProperties());
        if (this.configs.autoInitialize)
        {
            this.initialize();
        }

        this._addDOMMessageHandler("dinobros:dinostruct:runtime", this._onDomMessage);

        setTimeout(async () =>
        {
            this._postToDOM("dinobros:dinostruct:dom:sync", { message: "Hello from sync runtime!" });

            const response = await this._postToDOMAsync("dinobros:dinostruct:dom:async", {
                message: "Hello from async runtime!"
            });

            console.log("Received async response: ", response);

        }, 5_000);
    }

    protected async _initializeIds(): Promise<void>
    {
        let deviceId = await this.runtime.storage.getItem("dinostruct:internal:deviceId") as string;
        if (deviceId)
        {
            this._isReturningUser = true;
        }
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
        this._firestore = getFirestore(this._firebase);

        Object.defineProperty(this, "firestore", { value: this._firestore });
    }

    public async initialize(): Promise<void>
    {
        if (this._initialized)
        {
            throw new DinostructException(DinostructExceptionCode.AlreadyInitialized);
        }

        await this._initializeIds();

        this._initializeFirebase();

        // eslint-disable-next-line no-console
        console.info(`Dinostruct plugin initialized successfully. (v${DinostructC3Instance.Version})`);
    }
}

C3.Plugins.Dinobros_DinostructPlugin.Instance = DinostructC3Instance;
