import { RuntimeException } from "@byloth/core";

export enum DinostructExceptionCode
{
    UnknownError = "UNKNOWN_ERROR",

    NotInitialized = "NOT_INITIALIZED",
    AlreadyInitialized = "ALREADY_INITIALIZED",

    MissingConfiguration = "MISSING_CONFIGURATION"
}

export class DinostructException extends RuntimeException
{
    public readonly code: DinostructExceptionCode;

    public constructor(code: DinostructExceptionCode = DinostructExceptionCode.UnknownError)
    {
        super(`An error occurred in Dinostruct plugin with code: ${code}`);

        this.code = code;
    }
}
