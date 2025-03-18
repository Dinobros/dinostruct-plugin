import type { FieldValue } from "firebase/firestore";
import type { RawEvent } from "..";

export interface FirestoreRawEvent extends RawEvent
{
    timestamp: FieldValue;
}
