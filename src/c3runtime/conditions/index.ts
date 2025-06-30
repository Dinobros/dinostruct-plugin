import * as Authentication from "./authentication";
import * as ErrorHandling from "./error-handling";
import * as Integration from "./integration";
import * as Leaderboard from "./leaderboard";
import * as Management from "./management";
import * as Polls from "./polls";

import type { Condition } from "./types";

const DinostructC3Conditions = {
    ...Authentication,
    ...ErrorHandling,
    ...Integration,
    ...Leaderboard,
    ...Management,
    ...Polls

} satisfies Record<string, Condition>;

export default DinostructC3Conditions;
