import DinostructC3Conditions from "../conditions";
import Dinostruct from "../instance";

export async function Initialize(this: Dinostruct): Promise<void>
{
    try
    {
        await this.initialize();

        // eslint-disable-next-line no-console
        console.info(`Dinostruct (v${Dinostruct.Version}) manually initialized successfully. RAAAWR! 🦖`);

        this._trigger(DinostructC3Conditions.TriggerOnInitialized);
    }
    catch (error)
    {
        this.handleError(error);
    }
}
