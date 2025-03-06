import FirebaseConfigs from "./firebase";

export default class Configs
{
    public autoInitialize: boolean;
    public timeout: number;

    public enableLogEvents: boolean;
    public useLogEventsEndpoint: boolean;
    public customLogEventsEndpoint: string;

    public readonly firebase: FirebaseConfigs;

    public constructor(properties: SDKPropertyType[])
    {
        this.autoInitialize = properties[0] as boolean;
        this.timeout = properties[1] as number;

        this.enableLogEvents = properties[2] as boolean;
        this.useLogEventsEndpoint = properties[3] as boolean;
        this.customLogEventsEndpoint = properties[4] as string;

        this.firebase = new FirebaseConfigs(properties);
    }
}
