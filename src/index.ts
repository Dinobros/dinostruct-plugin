import DinostructSDK from "./plugin";
import DinostructSDKInstance from "./instance";
import DinostructSDKType from "./type";

const SDK = globalThis.SDK;

// eslint-disable-next-line camelcase
SDK.Plugins.Dinobros_DinostructPlugin = DinostructSDK;
SDK.Plugins.Dinobros_DinostructPlugin.Instance = DinostructSDKInstance;
SDK.Plugins.Dinobros_DinostructPlugin.Type = DinostructSDKType;

SDK.IPluginBase.Register(DinostructSDK.ID, DinostructSDK);
