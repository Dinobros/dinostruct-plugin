import * as ErrorHandling from "./error-handling";
import type { Expression } from "./types";

const C3 = globalThis.C3;
const DinostructC3Expressions = { ...ErrorHandling } satisfies Record<string, Expression>;

C3.Plugins.Dinobros_DinostructPlugin.Exps = DinostructC3Expressions;

export default DinostructC3Expressions;
