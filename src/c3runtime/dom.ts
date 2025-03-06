class DomHandler extends DOMHandler
{
    protected _onRuntimeSyncMessage = (message: unknown): JSONValue =>
    {
        console.log("Received sync message: ", message);

        return { message: "Hello from sync DOM handler!" };
    };
    protected _onRuntimeAsyncMessage = async (message: unknown): Promise<JSONValue> =>
    {
        console.log("Received async message: ", message);

        return { message: "Hello from async DOM handler!" };
    };

    public constructor(runtime: IRuntimeInterface)
    {
        super(runtime, "dinobros-dinostruct_plugin-dom_handler");

        this.AddRuntimeMessageHandler("dinobros:dinostruct:dom:sync", this._onRuntimeSyncMessage);
        this.AddRuntimeMessageHandler("dinobros:dinostruct:dom:async", this._onRuntimeAsyncMessage);
    }
}

RuntimeInterface.AddDOMHandlerClass(DomHandler);
