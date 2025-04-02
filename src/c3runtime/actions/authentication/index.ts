import { DinostructException, DinostructExceptionCode } from "@/exceptions";

import type Dinostruct from "../../instance";
import { logInAnonymously } from "./core";
import DinostructC3Conditions from "@/c3runtime/conditions";

export async function LogInAnonymously(this: Dinostruct, username: string): Promise<void>
{
    try
    {
        if (this._user) { throw new DinostructException(DinostructExceptionCode.AlreadyAuthenticated); }

        this._user = await logInAnonymously(this, { username });
        this._isNewUser = true;

        this._trigger(DinostructC3Conditions.TriggerOnUserLogin);
    }
    catch (error)
    {
        this.handleError(error);
    }
}

export async function LogOut(this: Dinostruct): Promise<void>
{
    try
    {
        if (!(this._user)) { throw new DinostructException(DinostructExceptionCode.NotAuthenticated); }

        await this.firebaseAuth.signOut();

        this._user = null;
        this._isNewUser = false;

        // eslint-disable-next-line no-console
        console.info("The user has been logged out. Bye! 👋");

        this._trigger(DinostructC3Conditions.TriggerOnUserLogout);
    }
    catch (error)
    {
        this.handleError(error);
    }
}
