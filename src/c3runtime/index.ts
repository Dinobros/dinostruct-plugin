import DinostructC3Instance from "./instance";
import DinostructC3Plugin from "./plugin";
import DinostructC3Type from "./type";
import DinostructC3Actions from "./actions";
import DinostructC3Conditions from "./conditions";
import DinostructC3Expressions from "./expressions";

const C3 = globalThis.C3;

// eslint-disable-next-line camelcase
C3.Plugins.Dinobros_DinostructPlugin = DinostructC3Plugin;
C3.Plugins.Dinobros_DinostructPlugin.Instance = DinostructC3Instance;
C3.Plugins.Dinobros_DinostructPlugin.Type = DinostructC3Type;

C3.Plugins.Dinobros_DinostructPlugin.Acts = DinostructC3Actions;
C3.Plugins.Dinobros_DinostructPlugin.Cnds = DinostructC3Conditions;
C3.Plugins.Dinobros_DinostructPlugin.Exps = DinostructC3Expressions;
