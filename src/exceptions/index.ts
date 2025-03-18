import { RuntimeException } from "@byloth/core";

export enum DinostructExceptionCode
{
    UnknownError = "UNKNOWN_ERROR",

    NotInitialized = "NOT_INITIALIZED",
    AlreadyInitialized = "ALREADY_INITIALIZED",

    MissingConfiguration = "MISSING_CONFIGURATION",

    NetworkError = "NETWORK_ERROR",
    RequestError = "REQUEST_ERROR",
    TimeoutError = "TIMEOUT_ERROR",

    NotAuthenticated = "NOT_AUTHENTICATED",
    NotAuthorized = "NOT_AUTHORIZED",
}

export class DinostructException extends RuntimeException
{
    public readonly code: DinostructExceptionCode;

    public constructor(code: DinostructExceptionCode = DinostructExceptionCode.UnknownError, cause?: unknown)
    {
        super(`An error occurred in Dinostruct plugin with code: ${code}`, cause);

        this.code = code;
    }
}
