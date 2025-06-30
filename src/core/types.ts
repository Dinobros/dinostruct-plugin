export type Payload = Record<string, unknown>;

export type DateTimeFormatStyle = "full" | "long" | "medium" | "short";
export interface DateTimeFormatOptions
{
    dateStyle?: DateTimeFormatStyle;
    timeStyle?: DateTimeFormatStyle;
}

export interface Message<T extends Payload = Payload>
{
    action: string;
    data: T;
    targetOrigin?: string;
}
