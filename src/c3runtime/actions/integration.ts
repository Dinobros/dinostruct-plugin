import { DinostructException } from "@/exceptions";

import DinostructC3Conditions from "../conditions";
import Dinostruct from "../instance";

export async function SendMessageToParent(
    this: Dinostruct, target: string, payload: IObjectClass<IJSONInstance>, empty = false
): Promise<void>
{
    try
    {
        const jsonObj = payload.getFirstPickedInstance()!;
        const _payload = jsonObj.getJsonDataCopy();

        if (empty) { jsonObj.setJsonDataCopy({ }); }

        const result = await this._postToDOMAsync("parent:message:send", {
            data: _payload,
            targetOrigin: target
        });

        if (result !== true) { throw new DinostructException(); }

        // eslint-disable-next-line no-console
        console.debug("Message sent to the parent successfully. Did you get it? 📨");

        this._trigger(DinostructC3Conditions.TriggerOnMessageToParentSent);
    }
    catch (error)
    {
        this.handleError(error, "SendMessageToParent");
    }
}
