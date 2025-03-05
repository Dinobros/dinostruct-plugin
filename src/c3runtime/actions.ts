import type DinostructC3Instance from "./instance";

const C3 = globalThis.C3;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Action<T extends unknown[] = any[]> = (this: DinostructC3Instance, ...args: T) => void;

const DinostructC3Actions = {
    LogToConsole(this: DinostructC3Instance): void
    {
        // eslint-disable-next-line no-console
        console.log("This is the 'Log to console' action. Test property = " + this.testProperty);
    }

} satisfies Record<string, Action>;

C3.Plugins.Dinobros_DinostructPlugin.Acts = DinostructC3Actions;

export default DinostructC3Actions;
