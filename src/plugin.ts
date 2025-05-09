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
    public static readonly Version = "0.3.1";
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
        this._info.SetIcon("icon.png", "image/png");
        this._info.SetIsSingleGlobal(true);
        this._info.SetCanBeBundled(false);

        this._info.SetC3RuntimeScripts([
            "c3runtime/index.js",
            "c3runtime/vendor.js",
            "c3runtime/firestore.js"
        ]);

        this._info.SetDOMSideScripts(["c3runtime/domSide.js"]);
        this._info.SetRuntimeModuleMainScript("c3runtime/index.js");

        SDK.Lang.PushContext(".properties");

        this._info.SetProperties([
            new SDK.PluginProperty("check", "auto-initialize", true), // 0
            new SDK.PluginProperty("integer", "timeout", 5_000), // 1

            new SDK.PluginProperty("group", "log_events"),
            new SDK.PluginProperty("check", "enable-log_events", true), // 2
            new SDK.PluginProperty("text", "custom-log_events-endpoint"), // 3

            new SDK.PluginProperty("group", "firebase-sdk"),
            new SDK.PluginProperty("text", "firebase-api_key"), // 4
            new SDK.PluginProperty("text", "firebase-auth_domain"), // 5
            new SDK.PluginProperty("text", "firebase-database_url"), // 6
            new SDK.PluginProperty("text", "firebase-project_id"), // 7
            new SDK.PluginProperty("text", "firebase-storage_bucket"), // 8
            new SDK.PluginProperty("text", "firebase-messaging_sender_id"), // 9
            new SDK.PluginProperty("text", "firebase-app_id"), // 10
            new SDK.PluginProperty("text", "firebase-measurement_id"), // 11
            new SDK.PluginProperty("text", "firebase-default_region", "europe-west1"), // 12

            new SDK.PluginProperty("group", "firebase-app_check"),
            new SDK.PluginProperty("check", "enable-app_check"), // 13
            new SDK.PluginProperty("text", "recaptcha-site_key") // 14
        ]);

        SDK.Lang.PopContext(); // .properties
        SDK.Lang.PopContext();
    }
}
