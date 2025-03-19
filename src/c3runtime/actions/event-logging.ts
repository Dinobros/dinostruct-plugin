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
    else
    {
        _payload = { };
    }

    await this.logEvent(type, _payload);
}
