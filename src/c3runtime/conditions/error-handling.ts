import type Dinostruct from "../instance";

export function TriggerOnErrorAction(this: Dinostruct, action?: string): boolean
{
    if (action !== undefined) { return action === this.lastErrorAction; }

    return true;
}
export function TriggerOnErrorCode(this: Dinostruct, code?: string): boolean
{
    if (code !== undefined) { return code === this.lastErrorCode; }

    return true;
}
