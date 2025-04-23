import { RuntimeException } from "@byloth/core";

export enum DinostructExceptionCode
{
    UnknownError = "UNKNOWN_ERROR",
    ImplementationError = "IMPLEMENTATION_ERROR",

    NotInitialized = "NOT_INITIALIZED",
    AlreadyInitialized = "ALREADY_INITIALIZED",

    MissingConfiguration = "MISSING_CONFIGURATION",

    NetworkError = "NETWORK_ERROR",
    RequestError = "REQUEST_ERROR",
    TimeoutError = "TIMEOUT_ERROR",

    NotAuthenticated = "NOT_AUTHENTICATED",
    NotAuthorized = "NOT_AUTHORIZED",

    AlreadyAuthenticated = "ALREADY_AUTHENTICATED",

    UserNotFound = "USER_NOT_FOUND",
    UserAlreadyExists = "USER_ALREADY_EXISTS",

    LeaderboardNotFound = "LEADERBOARD_NOT_FOUND",
}

export class DinostructException extends RuntimeException
{
    public readonly code: DinostructExceptionCode;

    public constructor(
        code: DinostructExceptionCode = DinostructExceptionCode.UnknownError, cause?: unknown, message?: string
    )
    {
        if (!(message))
        {
            message = `An error occurred in Dinostruct plugin with code: ${code}`;
        }

        super(message, cause);

        this.code = code;
    }
}

export class UserAlreadyExistsException extends DinostructException
{
    public constructor(cause?: unknown, message?: string)
    {
        super(DinostructExceptionCode.UserAlreadyExists, cause, message);
    }
}
