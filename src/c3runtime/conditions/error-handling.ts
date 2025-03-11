import type { DinostructExceptionCode } from "@/exceptions";
import type Dinostruct from "../instance";

export function TriggerOnError(this: Dinostruct, code: DinostructExceptionCode): boolean
{
    return true;
}
