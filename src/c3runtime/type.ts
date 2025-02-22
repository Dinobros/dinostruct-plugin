import type { SingleGlobalInstance } from "./instance";

const C3 = globalThis.C3;

export class SingleGlobalType extends globalThis.ISDKObjectTypeBase<SingleGlobalInstance>
{
    public constructor()
    {
        super();
    }

    public override _onCreate(): void { /* ... */ }
}

C3.Plugins.Dinobros_Construct3PluginTemplate.Type = SingleGlobalType;
