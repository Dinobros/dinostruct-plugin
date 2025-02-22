const C3 = globalThis.C3;

export class SingleGlobalInstance extends globalThis.ISDKInstanceBase
{
    protected _testProperty: number;

    public get testProperty() { return this._testProperty; }
    public set testProperty(value) { this._testProperty = value; }

    public constructor()
    {
        super();

        // Initialize object properties...
        this._testProperty = 0;

        const properties = this._getInitProperties();
        if (properties) // Note: properties may be null in some cases!
        {
            this._testProperty = properties[0] as number;
        }
    }

    public _release(): void
    {
        super._release();
    }
    public _saveToJson(): JSONValue
    {
        return { /* Data to be saved in savegames.. */ };
    }

    public _loadFromJson(o: JSONValue): void
    {
        // Load state from savegames...
    }
}

C3.Plugins.Dinobros_Construct3PluginTemplate.Instance = SingleGlobalInstance;
