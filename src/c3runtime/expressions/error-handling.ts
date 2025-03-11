/* eslint-disable camelcase */

import { DinostructException, DinostructExceptionCode } from "@/exceptions";
import type Dinostruct from "../instance";

export function LastError(this: Dinostruct): DinostructExceptionCode
{
    if ((this.lastError === undefined) || !(this.lastError instanceof DinostructException))
    {
        return DinostructExceptionCode.UnknownError;
    }

    return this.lastError.code;
}

export function XError_Unknown(this: Dinostruct): string
{
    return DinostructExceptionCode.UnknownError;
}
export function XError_NotInitialized(this: Dinostruct): string
{
    return DinostructExceptionCode.NotInitialized;
}
export function XError_AlreadyInitialized(this: Dinostruct): string
{
    return DinostructExceptionCode.AlreadyInitialized;
}
export function XError_MissingConfiguration(this: Dinostruct): string
{
    return DinostructExceptionCode.MissingConfiguration;
}
