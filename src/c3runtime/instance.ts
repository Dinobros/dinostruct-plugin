const C3 = globalThis.C3;

export default class DinostructC3Instance extends globalThis.ISDKInstanceBase
{
    protected _onDomMessage = (message: unknown): void =>
    {
        console.log("Received DOM message: ", message);
    };

    public constructor()
    {
        super({ domComponentId: "dinobros-dinostruct_plugin-dom_handler" });

        /*
        // Initialize object properties...
        this._testProperty = 0;

        const properties = this._getInitProperties();
        if (properties) // Note: properties may be null in some cases!
        {
            this._testProperty = properties[0] as number;
        }
        */

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

    public override _release(): void
    {
        super._release();
    }
    public override _saveToJson(): JSONValue
    {
        return { /* Data to be saved in savegames.. */ };
    }

    public override _loadFromJson(o: JSONValue): void
    {
        // Load state from savegames...
    }
}

C3.Plugins.Dinobros_DinostructPlugin.Instance = DinostructC3Instance;
