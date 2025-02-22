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

export class MyCustomPlugin extends SDK.IPluginBase
{
    public static readonly ID = "Dinobros_Construct3PluginTemplate";
    public static readonly Category = "general";

    public constructor()
    {
        super(MyCustomPlugin.ID);

        SDK.Lang.PushContext(`plugins.${MyCustomPlugin.ID.toLowerCase()}`);

        this._info.SetName(globalThis.lang(".name"));
        this._info.SetDescription(globalThis.lang(".description"));
        this._info.SetCategory(MyCustomPlugin.Category);
        this._info.SetAuthor("Dinobros Srl");
        this._info.SetHelpUrl(globalThis.lang(".help-url"));
        this._info.SetIsSingleGlobal(true);

        this._info.AddC3RuntimeScript("c3runtime/internals.js");
        this._info.AddC3RuntimeScript("c3runtime/runtime.js");
        this._info.AddC3RuntimeScript("c3runtime/vendors.js");

        SDK.Lang.PushContext(".properties");

        this._info.SetProperties([new SDK.PluginProperty("integer", "test-property", 0)]);

        SDK.Lang.PopContext(); // .properties
        SDK.Lang.PopContext();
    }
}
