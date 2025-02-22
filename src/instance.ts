const SDK = globalThis.SDK;

export class MyCustomInstance extends SDK.IInstanceBase
{
    public constructor(sdkType: SDK.ITypeBase, iInstance: SDK.IObjectInstance)
    {
        super(sdkType, iInstance);
    }

    public override Release(): void { /* ... */ }
    public override OnCreate(): void { /* ... */ }

    public override OnPropertyChanged(id: string, value: EditorPropertyValueType): void { /* ... */ }

    public override LoadC2Property(name: string, valueString: string): boolean { return false; }
}
