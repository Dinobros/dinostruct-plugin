import type Dinostruct from "../instance";

export async function LogEvent(this: Dinostruct, type: string, payload?: IObjectClass<IJSONInstance>, empty = false)
    : Promise<void>
{
    let _payload: JSONObject;
    if (payload)
    {
        const jsonObj = payload.getFirstPickedInstance()!;

        _payload = jsonObj.getJsonDataCopy();
        if (empty) { jsonObj.setJsonDataCopy({ }); }
    }
    else { _payload = { }; }

    await this.logEvent(type, _payload);
}

export async function LogGameStartEvent(this: Dinostruct, payload?: IObjectClass<IJSONInstance>, empty = false)
    : Promise<void>
{
    await LogEvent.call(this, "game:start", payload, empty);
}
export async function LogGameFinishEvent(this: Dinostruct, payload?: IObjectClass<IJSONInstance>, empty = false)
    : Promise<void>
{
    await LogEvent.call(this, "game:finish", payload, empty);
}
