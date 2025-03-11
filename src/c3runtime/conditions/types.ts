import type Dinostruct from "../instance";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Condition<T extends unknown[] = any[]> = (this: Dinostruct, ...args: T) => boolean;
