import type DinostructC3Instance from "./instance";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Condition<T extends unknown[] = any[]> = (this: DinostructC3Instance, ...args: T) => boolean;

const C3 = globalThis.C3;
const DinostructC3Conditions: Record<string, Condition> = {
    IsLargeNumber(this: DinostructC3Instance, num: number): boolean
    {
        return num > 100;
    }
};

C3.Plugins.Dinobros_DinostructPlugin.Cnds = DinostructC3Conditions;

export default DinostructC3Conditions;
