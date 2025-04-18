import type Dinostruct from "../instance";

export function TriggerOnError(this: Dinostruct, code?: string): boolean
{
    if (code !== undefined) { return code === this.lastErrorCode; }

    return true;
}
