import * as LogEvents from "./log-events";
import type { Action } from "./types";

const DinostructC3Actions = { ...LogEvents } satisfies Record<string, Action>;

export default DinostructC3Actions;
