const C3 = globalThis.C3;

export class SingleGlobalPlugin extends globalThis.ISDKPluginBase
{
    public constructor()
    {
        super();
    }
}

// eslint-disable-next-line camelcase
C3.Plugins.Dinobros_Construct3PluginTemplate = SingleGlobalPlugin;
