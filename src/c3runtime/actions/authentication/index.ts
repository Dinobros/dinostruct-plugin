import type Dinostruct from "../../instance";

import { logInAnonymously } from "./core";

export async function LogInAnonymously(this: Dinostruct, username: string): Promise<void>
{
    try
    {
        this._user = await logInAnonymously(this, { username });
        this._isNewUser = true;
    }
    catch (error)
    {
        this.handleError(error);
    }
}
