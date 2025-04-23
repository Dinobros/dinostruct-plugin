import { hash as computeHash } from "@byloth/core";
import type { DateTimeFormatOptions } from "./types";

export function computeUsername(userId: string, username: string | undefined, hashLimit = 5): string
{
    if (!(username))
    {
        const hash = `${Math.abs(computeHash(userId))}`.substring(0, hashLimit);

        return `User #${hash}`;
    }

    return username;
}

export function formatDatetime(datetime?: Date)
{
    const options: DateTimeFormatOptions = { dateStyle: "short", timeStyle: "short" };
    const formattedDatetime = new Intl.DateTimeFormat(undefined, options);

    return formattedDatetime.format(datetime);
}
export function formatTimestamp(timestamp: { toDate?: () => Date, _seconds?: number })
{
    if (timestamp.toDate)
    {
        return formatDatetime(timestamp.toDate());
    }
    else if (timestamp._seconds)
    {
        return formatDatetime(new Date(timestamp._seconds * 1000));
    }

    return formatDatetime();
}
