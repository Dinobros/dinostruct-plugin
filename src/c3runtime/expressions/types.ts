import type Dinostruct from "../instance";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Expression<T extends unknown[] = any[], R extends number | string = number | string> =
    (this: Dinostruct, ...args: T) => R;
