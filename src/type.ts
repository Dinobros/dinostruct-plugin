const SDK = globalThis.SDK;

export class MyCustomPluginType extends SDK.ITypeBase
{
    public constructor(sdkPlugin: SDK.IPluginBase, iObjectType: SDK.IObjectType)
    {
        super(sdkPlugin, iObjectType);
    }
}
