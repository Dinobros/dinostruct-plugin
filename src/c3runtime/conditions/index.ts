import * as ErrorHandling from "./error-handling";
import * as Management from "./management";

import type { Condition } from "./types";

const DinostructC3Conditions = {
    ...ErrorHandling,
    ...Management

} satisfies Record<string, Condition>;

export default DinostructC3Conditions;
