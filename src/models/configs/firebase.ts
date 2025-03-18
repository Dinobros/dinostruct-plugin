import { DinostructException, DinostructExceptionCode } from "@/exceptions";
import type { FirebaseOptions } from "firebase/app";

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
        this.apiKey = properties[4] as string;
        this.authDomain = properties[5] as string;
        this.databaseUrl = properties[6] as string;
        this.projectId = properties[7] as string;
        this.storageBucket = properties[8] as string;
        this.messagingSenderId = properties[9] as string;
        this.appId = properties[10] as string;
        this.measurementId = properties[11] as string;
        this.defaultRegion = properties[12] as string;

        this.enableAppCheck = properties[13] as boolean;
        this.recaptchaSiteKey = properties[14] as string;
    }

    public getOptions(): FirebaseOptions
    {
        if (!(this.apiKey) || !(this.projectId) || !(this.appId))
        {
            throw new DinostructException(DinostructExceptionCode.MissingConfiguration);
        }

        return {
            apiKey: this.apiKey,
            authDomain: this.authDomain,
            databaseURL: this.databaseUrl,
            projectId: this.projectId,
            storageBucket: this.storageBucket,
            messagingSenderId: this.messagingSenderId,
            appId: this.appId,
            measurementId: this.measurementId
        };
    }
}
