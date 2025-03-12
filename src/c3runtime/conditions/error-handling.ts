import { DinostructException, DinostructExceptionCode } from "@/exceptions";
import type Dinostruct from "../instance";

export function TriggerOnError(this: Dinostruct, code?: DinostructExceptionCode): boolean
{
    if (code !== undefined)
    {
        if (this.lastError instanceof DinostructException)
        {
            return this.lastError.code === code;
        }
        if (this.lastError !== undefined)
        {
            return code === DinostructExceptionCode.UnknownError;
        }

        return false;
    }

    return true;
}
