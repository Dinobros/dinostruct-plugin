/* eslint-disable camelcase */

import { DinostructExceptionCode } from "@/exceptions";
import type Dinostruct from "../instance";

export function ErrorCode(this: Dinostruct): DinostructExceptionCode
{
    return this.lastErrorCode;
}

export function XError_Unknown(this: Dinostruct): DinostructExceptionCode.UnknownError
{
    return DinostructExceptionCode.UnknownError;
}
export function XError_Implementation(this: Dinostruct): DinostructExceptionCode.ImplementationError
{
    return DinostructExceptionCode.ImplementationError;
}

export function XError_NotInitialized(this: Dinostruct): DinostructExceptionCode.NotInitialized
{
    return DinostructExceptionCode.NotInitialized;
}
export function XError_AlreadyInitialized(this: Dinostruct): DinostructExceptionCode.AlreadyInitialized
{
    return DinostructExceptionCode.AlreadyInitialized;
}

export function XError_MissingConfiguration(this: Dinostruct): DinostructExceptionCode.MissingConfiguration
{
    return DinostructExceptionCode.MissingConfiguration;
}

export function XError_NetworkError(this: Dinostruct): DinostructExceptionCode.NetworkError
{
    return DinostructExceptionCode.NetworkError;
}
export function XError_RequestError(this: Dinostruct): DinostructExceptionCode.RequestError
{
    return DinostructExceptionCode.RequestError;
}
export function XError_TimeoutError(this: Dinostruct): DinostructExceptionCode.TimeoutError
{
    return DinostructExceptionCode.TimeoutError;
}

export function XError_NotAuthenticated(this: Dinostruct): DinostructExceptionCode.NotAuthenticated
{
    return DinostructExceptionCode.NotAuthenticated;
}
export function XError_NotAuthorized(this: Dinostruct): DinostructExceptionCode.NotAuthorized
{
    return DinostructExceptionCode.NotAuthorized;
}

export function XError_AlreadyAuthenticated(this: Dinostruct): DinostructExceptionCode.AlreadyAuthenticated
{
    return DinostructExceptionCode.AlreadyAuthenticated;
}

export function XError_UserNotFound(this: Dinostruct): DinostructExceptionCode.UserNotFound
{
    return DinostructExceptionCode.UserNotFound;
}
export function XError_UserAlreadyExists(this: Dinostruct): DinostructExceptionCode.UserAlreadyExists
{
    return DinostructExceptionCode.UserAlreadyExists;
}
export function XError_LeaderboardNotFound(this: Dinostruct): DinostructExceptionCode.LeaderboardNotFound
{
    return DinostructExceptionCode.LeaderboardNotFound;
}
