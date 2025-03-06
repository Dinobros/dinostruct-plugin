import * as LogEvents from "./log-events";

import type { Action } from "./types";

const C3 = globalThis.C3;
const DinostructC3Actions: Record<string, Action> = { ...LogEvents };

C3.Plugins.Dinobros_DinostructPlugin.Acts = DinostructC3Actions;

export default DinostructC3Actions;
