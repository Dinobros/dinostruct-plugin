import type DinostructC3Instance from "./instance";

const C3 = globalThis.C3;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Expression<T extends unknown[] = any[], R extends number | string = number | string>
    = (this: DinostructC3Instance, ...args: T) => R;

const DinostructC3Expressions = {
    Double(this: DinostructC3Instance, num: number): number
    {
        return num * 2;
    }

} satisfies Record<string, Expression>;

C3.Plugins.Dinobros_DinostructPlugin.Exps = DinostructC3Expressions;

export default DinostructC3Expressions;
