import type { DateTimeFormatOptions } from "./types";

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

export const NoOp = () => { /* ... */ };
