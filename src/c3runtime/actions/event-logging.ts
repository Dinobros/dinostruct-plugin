import type Dinostruct from "../instance";

export function LogEvent(this: Dinostruct, type: string, payload?: IObjectClass<IJSONInstance>, empty = false): void
{
    try
    {
        let _payload: JSONObject;
        if (payload)
        {
            const jsonObj = payload.getFirstPickedInstance()!;

            _payload = jsonObj.getJsonDataCopy();
            if (empty) { jsonObj.setJsonDataCopy({ }); }
        }
        else { _payload = { }; }

        this.logEvent(type, _payload);
    }
    catch (error)
    {
        // eslint-disable-next-line no-console
        console.error(error);
    }
}

export function LogGameStartEvent(this: Dinostruct, payload?: IObjectClass<IJSONInstance>, empty = false): void
{
    LogEvent.call(this, "game:start", payload, empty);
}
export function LogGameFinishEvent(this: Dinostruct, payload?: IObjectClass<IJSONInstance>, empty = false): void
{
    LogEvent.call(this, "game:finish", payload, empty);
}
