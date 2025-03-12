import * as ErrorHandling from "./error-handling";
import type { Condition } from "./types";

const DinostructC3Conditions = { ...ErrorHandling } satisfies Record<string, Condition>;

export default DinostructC3Conditions;
