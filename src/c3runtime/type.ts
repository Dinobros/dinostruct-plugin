import type DinostructC3Instance from "./instance";

const C3 = globalThis.C3;

export default class DinostructC3Type extends globalThis.ISDKObjectTypeBase<DinostructC3Instance>
{
    public constructor()
    {
        super();
    }

    public override _onCreate(): void { /* ... */ }
}

C3.Plugins.Dinobros_DinostructPlugin.Type = DinostructC3Type;
