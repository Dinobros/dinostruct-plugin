export type Payload = Record<string, unknown>;
export interface RawEvent
{
    type: string;
    payload: Payload;
    deviceId: string;
    sessionId: string;
    userId?: string;
}
