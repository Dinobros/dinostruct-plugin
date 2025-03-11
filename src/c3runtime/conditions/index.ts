import * as ErrorHandling from "./error-handling";
import type { Condition } from "./types";

const C3 = globalThis.C3;
const DinostructC3Conditions = { ...ErrorHandling } satisfies Record<string, Condition>;

C3.Plugins.Dinobros_DinostructPlugin.Cnds = DinostructC3Conditions;

export default DinostructC3Conditions;
