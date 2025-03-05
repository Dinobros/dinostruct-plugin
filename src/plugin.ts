const SDK = globalThis.SDK;

/*
 * The plugin ID is how Construct identifies different kinds of plugins.
 *
 * *** NEVER CHANGE THE PLUGIN ID! ***
 *
 * If you change the plugin ID after releasing the plugin, Construct will think it is an entirely different
 *  plugin and assume it is incompatible with the old one, and YOU WILL BREAK ALL EXISTING PROJECTS USING THE PLUGIN.
 * Only the plugin name is displayed in the editor, so to rename your plugin change the name but NOT the ID.
 * If you want to completely replace a plugin, make it deprecated (it will be hidden but old projects keep working),
 *  and create an entirely new plugin with a different plugin ID.
*/

export default class DinostructSDK extends SDK.IPluginBase
{
    public static readonly ID = "Dinobros_DinostructPlugin";
    public static readonly Author = "Dinobros Srl";
    public static readonly Version = "1.0.0";
    public static readonly Category = "general";

    public constructor()
    {
        super(DinostructSDK.ID);

        SDK.Lang.PushContext(`plugins.${DinostructSDK.ID.toLowerCase()}`);

        this._info.SetName(globalThis.lang(".name"));
        this._info.SetDescription(globalThis.lang(".description"));
        this._info.SetCategory(DinostructSDK.Category);
        this._info.SetAuthor(DinostructSDK.Author);
        this._info.SetVersion(DinostructSDK.Version);
        this._info.SetHelpUrl(globalThis.lang(".help-url"));
        this._info.SetIsSingleGlobal(true);
        this._info.SetCanBeBundled(false);

        // this._info.AddC3RuntimeScript("c3runtime/runtime.js");
        // this._info.AddC3RuntimeScript("c3runtime/internals.js");
        // this._info.AddC3RuntimeScript("c3runtime/vendors.js");

        this._info.SetDOMSideScripts(["c3runtime/dom.js"]);

        SDK.Lang.PushContext(".properties");

        this._info.SetProperties([
            new SDK.PluginProperty("check", "auto-initialize", true), // 0

            new SDK.PluginProperty("group", "firebase-sdk"),
            new SDK.PluginProperty("text", "firebase-api-key"), // 1
            new SDK.PluginProperty("text", "firebase-auth-domain"), // 2
            new SDK.PluginProperty("text", "firebase-database-url"), // 3
            new SDK.PluginProperty("text", "firebase-project-id"), // 4
            new SDK.PluginProperty("text", "firebase-storage-bucket"), // 5
            new SDK.PluginProperty("text", "firebase-messaging-sender-id"), // 6
            new SDK.PluginProperty("text", "firebase-app-id"), // 7
            new SDK.PluginProperty("text", "firebase-measurement-id"), // 8

            new SDK.PluginProperty("group", "firebase-app-check"),
            new SDK.PluginProperty("check", "enable-app-check"), // 9
            new SDK.PluginProperty("text", "recaptcha-site-key"), // 10
        ]);

        SDK.Lang.PopContext(); // .properties
        SDK.Lang.PopContext();
    }
}
