import type { SingleGlobalInstance } from "./instance";

const C3 = globalThis.C3;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Condition<T extends unknown[] = any[]> = (this: SingleGlobalInstance, ...args: T) => boolean;

export const SingleGlobalConditions = {
    IsLargeNumber(this: SingleGlobalInstance, num: number): boolean
    {
        return num > 100;
    }

} satisfies Record<string, Condition>;

C3.Plugins.Dinobros_Construct3PluginTemplate.Cnds = SingleGlobalConditions;
