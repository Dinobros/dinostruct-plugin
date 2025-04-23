import FirebaseConfigs from "./firebase";

export default class Configs
{
    public autoInitialize: boolean;
    public timeout: number;

    public enableEventLogging: boolean;
    public eventLoggingEndpoint: string;

    public readonly firebase: FirebaseConfigs;

    public constructor(properties: SDKPropertyType[])
    {
        this.autoInitialize = properties[0] as boolean;
        this.timeout = properties[1] as number;

        this.enableEventLogging = properties[2] as boolean;
        this.eventLoggingEndpoint = properties[3] as string;

        this.firebase = new FirebaseConfigs(properties);
    }
}
