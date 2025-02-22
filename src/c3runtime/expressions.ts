import type { SingleGlobalInstance } from "./instance";

const C3 = globalThis.C3;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Expression<T extends unknown[] = any[], R = any> = (this: SingleGlobalInstance, ...args: T) => R;

export const SingleGlobalExpressions = {
    Double(this: SingleGlobalInstance, num: number): number
    {
        return num * 2;
    }

} satisfies Record<string, Expression>;

C3.Plugins.Dinobros_Construct3PluginTemplate.Exps = SingleGlobalExpressions;
