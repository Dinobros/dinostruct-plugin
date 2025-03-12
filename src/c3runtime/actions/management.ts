import Dinostruct from "../instance";

export async function Initialize(this: Dinostruct): Promise<void>
{
    try
    {
        await this.initialize();

        // eslint-disable-next-line no-console
        console.info(`Dinostruct plugin manually initialized successfully. (v${Dinostruct.Version})`);
    }
    catch (error)
    {
        this.handleError(error);
    }
}
