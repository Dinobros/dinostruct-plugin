import type Dinostruct from "../instance";

export function TriggerOnMessageToParentSent(this: Dinostruct): boolean { return true; }
export function TriggerOnMessageFromParentReceived(
    this: Dinostruct, jsonRef: IObjectClass<IJSONInstance>, type?: string
): boolean
{

    if (type !== undefined)
    {
        const message = this.lastMessageReceived;
        if ((message instanceof Object) && ("type" in message))
        {
            if (message.type === type)
            {
                const jsonObj = jsonRef.getFirstPickedInstance()!;
                jsonObj.setJsonDataCopy(this.lastMessageReceived);
            }
        }

        return false;
    }

    const jsonObj = jsonRef.getFirstPickedInstance()!;
    jsonObj.setJsonDataCopy(this.lastMessageReceived);

    return true;
}
