import { DinostructException, DinostructExceptionCode } from "@/exceptions";
import type Dinostruct from "../instance";

export function UserId(this: Dinostruct): string
{
    try
    {
        if (!(this._user)) { throw new DinostructException(DinostructExceptionCode.NotAuthenticated); }

        return this._user.uid;
    }
    catch (error)
    {
        this.handleError(error);

        return "";
    }
}
export function EmailAddress(this: Dinostruct): string
{
    try
    {
        if (!(this._user)) { throw new DinostructException(DinostructExceptionCode.NotAuthenticated); }

        return this._emailAddress ?? "";
    }
    catch (error)
    {
        this.handleError(error);

        return "";
    }
}
export function Username(this: Dinostruct): string
{
    try
    {
        if (!(this._user)) { throw new DinostructException(DinostructExceptionCode.NotAuthenticated); }

        return this._username ?? "";
    }
    catch (error)
    {
        this.handleError(error);

        return "";
    }
}

export function GetUserProperty(this: Dinostruct, property: string): number | string
{
    try
    {
        if (!(this._user)) { throw new DinostructException(DinostructExceptionCode.NotAuthenticated); }

        return this._userProperties[property] ?? 0;
    }
    catch (error)
    {
        this.handleError(error);

        return 0;
    }
}

export function UserProperty(this: Dinostruct): string
{
    return this.lastUserPropertySet;
}
