import type DinostructC3Instance from "./instance";

const C3 = globalThis.C3;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Condition<T extends unknown[] = any[]> = (this: DinostructC3Instance, ...args: T) => boolean;

const DinostructC3Conditions = {
    IsLargeNumber(this: DinostructC3Instance, num: number): boolean
    {
        return num > 100;
    }

} satisfies Record<string, Condition>;

C3.Plugins.Dinobros_DinostructPlugin.Cnds = DinostructC3Conditions;

export default DinostructC3Conditions;
