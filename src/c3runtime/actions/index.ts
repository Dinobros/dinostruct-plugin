import * as EventLogging from "./event-logging";
import * as Management from "./management";

import type { Action } from "./types";

const DinostructC3Actions = {
    ...EventLogging,
    ...Management

} satisfies Record<string, Action>;

export default DinostructC3Actions;
