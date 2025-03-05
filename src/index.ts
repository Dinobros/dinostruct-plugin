import { MyCustomPlugin } from "./plugin";
import { MyCustomInstance } from "./instance";
import { MyCustomPluginType } from "./type";

const SDK = globalThis.SDK;

// eslint-disable-next-line camelcase
SDK.Plugins.Dinobros_DinostructPlugin = MyCustomPlugin;
SDK.Plugins.Dinobros_DinostructPlugin.Instance = MyCustomInstance;
SDK.Plugins.Dinobros_DinostructPlugin.Type = MyCustomPluginType;

SDK.IPluginBase.Register(MyCustomPlugin.ID, MyCustomPlugin);
