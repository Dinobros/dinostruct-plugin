import * as ErrorHandling from "./error-handling";
import type { Expression } from "./types";

const DinostructC3Expressions = { ...ErrorHandling } satisfies Record<string, Expression>;

export default DinostructC3Expressions;
