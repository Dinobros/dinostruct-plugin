import * as Authentication from "./authentication";
import * as EventLogging from "./event-logging";
import * as Leaderboard from "./leaderboard";
import * as Management from "./management";
import * as Polls from "./polls";

import type { Action } from "./types";

const DinostructC3Actions = {
    ...Authentication,
    ...EventLogging,
    ...Leaderboard,
    ...Management,
    ...Polls

} satisfies Record<string, Action>;

export default DinostructC3Actions;
