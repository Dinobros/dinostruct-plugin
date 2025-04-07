import { DinostructException, DinostructExceptionCode } from "@/exceptions";
import type Dinostruct from "../instance";

export function TriggerOnError(this: Dinostruct, code?: DinostructExceptionCode): boolean
{
    if (code !== undefined)
    {
        const lastError = this.lastError;
        if (!(lastError)) { return false; }

        if (lastError instanceof DinostructException)
        {
            return lastError.code === code;
        }

        return code === DinostructExceptionCode.UnknownError;
    }

    return true;
}
