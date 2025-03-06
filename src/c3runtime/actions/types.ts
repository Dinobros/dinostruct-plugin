import type DinostructC3Instance from "../instance";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Action<T extends unknown[] = any[]> = (this: DinostructC3Instance, ...args: T) => void;
