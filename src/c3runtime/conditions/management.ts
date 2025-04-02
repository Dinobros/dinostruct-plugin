import type Dinostruct from "../instance";

export function IsInitialized(this: Dinostruct): boolean
{
    return this._initialized;
}
export function TriggerOnInitialized(this: Dinostruct): boolean
{
    return true;
}

export function IsNewDevice(this: Dinostruct): boolean
{
    return this._isNewDevice;
}
