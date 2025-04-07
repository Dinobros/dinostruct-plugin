import { DinostructException, DinostructExceptionCode } from "@/exceptions";
import type Dinostruct from "../instance";

export function GetUserProperty(this: Dinostruct, property: string): number | string
{
    try
    {
        if (!(this._user)) { throw new DinostructException(DinostructExceptionCode.NotAuthenticated); }

        return this._userStore![property] as number | string;
    }
    catch (error)
    {
        this.handleError(error);

        return 0;
    }
}
