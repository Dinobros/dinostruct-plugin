const SDK = globalThis.SDK;

export class MyCustomInstance extends SDK.IInstanceBase
{
    public constructor(sdkType: SDK.ITypeBase, iInstance: SDK.IObjectInstance)
    {
        super(sdkType, iInstance);
    }

    public Release(): void { /* ... */ }
    public OnCreate(): void { /* ... */ }

    public OnPropertyChanged(id: string, value: EditorPropertyValueType): void { /* ... */ }

    public LoadC2Property(name: string, valueString: string): boolean { return false; }
}
