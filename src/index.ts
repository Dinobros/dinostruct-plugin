import { MyCustomPlugin } from "./plugin";
import { MyCustomInstance } from "./instance";
import { MyCustomPluginType } from "./type";

const SDK = globalThis.SDK;

// eslint-disable-next-line camelcase
SDK.Plugins.Dinobros_Construct3PluginTemplate = MyCustomPlugin;
SDK.Plugins.Dinobros_Construct3PluginTemplate.Instance = MyCustomInstance;
SDK.Plugins.Dinobros_Construct3PluginTemplate.Type = MyCustomPluginType;

SDK.IPluginBase.Register(MyCustomPlugin.ID, MyCustomPlugin);
