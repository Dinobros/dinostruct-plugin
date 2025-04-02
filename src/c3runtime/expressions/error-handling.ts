/* eslint-disable camelcase */

import { DinostructException, DinostructExceptionCode } from "@/exceptions";
import type Dinostruct from "../instance";

export function ErrorCode(this: Dinostruct): DinostructExceptionCode
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
export function XError_Implementation(this: Dinostruct): string
{
    return DinostructExceptionCode.ImplementationError;
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

export function XError_NetworkError(this: Dinostruct): string
{
    return DinostructExceptionCode.NetworkError;
}
export function XError_RequestError(this: Dinostruct): string
{
    return DinostructExceptionCode.RequestError;
}
export function XError_TimeoutError(this: Dinostruct): string
{
    return DinostructExceptionCode.TimeoutError;
}

export function XError_NotAuthenticated(this: Dinostruct): string
{
    return DinostructExceptionCode.NotAuthenticated;
}
export function XError_NotAuthorized(this: Dinostruct): string
{
    return DinostructExceptionCode.NotAuthorized;
}

export function XError_AlreadyAuthenticated(this: Dinostruct): string
{
    return DinostructExceptionCode.AlreadyAuthenticated;
}

export function XError_UserNotFound(this: Dinostruct): string
{
    return DinostructExceptionCode.UserNotFound;
}
export function XError_UserAlreadyExists(this: Dinostruct): string
{
    return DinostructExceptionCode.UserAlreadyExists;
}
