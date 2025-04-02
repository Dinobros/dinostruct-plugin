import type Dinostruct from "../instance";

export function IsUserLoggedIn(this: Dinostruct): boolean
{
    return (this._user !== null);
}

export function TriggerOnUserLogin(this: Dinostruct): boolean
{
    return true;
}
export function TriggerOnUserLogout(this: Dinostruct): boolean
{
    return true;
}

export function IsNewUser(this: Dinostruct): boolean
{
    return this._isNewUser;
}

export function IsUserAnonymous(this: Dinostruct): boolean
{
    return ((this._user !== null) && (this._user.isAnonymous));
}
