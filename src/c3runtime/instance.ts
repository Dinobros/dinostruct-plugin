import { v4 as uuid4 } from "uuid";

import Configs from "@/models/configs";
import { DinostructException, DinostructExceptionCode } from "@/exceptions";

const C3 = globalThis.C3;

export default class DinostructC3Instance extends globalThis.ISDKInstanceBase
{
    protected _initialized: boolean;

    protected _deviceId: string;
    protected _sessionId: string;

    protected _isReturningUser: boolean;

    protected _onDomMessage = (message: unknown): void =>
    {
        console.log("Received DOM message: ", message);
    };

    public readonly configs: Configs;

    public constructor()
    {
        super({ domComponentId: "dinobros-dinostruct_plugin-dom_handler" });

        this._initialized = false;

        this._deviceId = "";
        this._sessionId = "";

        this._isReturningUser = false;

        this.configs = new Configs(this._getInitProperties());

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

    public async initialize(): Promise<void>
    {
        if (this._initialized)
        {
            throw new DinostructException(DinostructExceptionCode.AlreadyInitialized);
        }

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
}

C3.Plugins.Dinobros_DinostructPlugin.Instance = DinostructC3Instance;
