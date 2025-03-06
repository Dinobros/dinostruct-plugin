export default class FirebaseConfigs
{
    public apiKey: string;
    public authDomain: string;
    public databaseUrl: string;
    public projectId: string;
    public storageBucket: string;
    public messagingSenderId: string;
    public appId: string;
    public measurementId: string;
    public defaultRegion: string;

    public enableAppCheck: boolean;
    public recaptchaSiteKey: string;

    public constructor(properties: SDKPropertyType[])
    {
        this.apiKey = properties[5] as string;
        this.authDomain = properties[6] as string;
        this.databaseUrl = properties[7] as string;
        this.projectId = properties[8] as string;
        this.storageBucket = properties[9] as string;
        this.messagingSenderId = properties[10] as string;
        this.appId = properties[11] as string;
        this.measurementId = properties[12] as string;
        this.defaultRegion = properties[13] as string;

        this.enableAppCheck = properties[14] as boolean;
        this.recaptchaSiteKey = properties[15] as string;
    }
}
