import * as LogEvents from "./log-events";
import * as Management from "./management";

import type { Action } from "./types";

const DinostructC3Actions = {
    ...LogEvents,
    ...Management

} satisfies Record<string, Action>;

export default DinostructC3Actions;
