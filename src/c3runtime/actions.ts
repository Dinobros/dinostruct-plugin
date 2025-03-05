import type DinostructC3Instance from "./instance";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Action<T extends unknown[] = any[]> = (this: DinostructC3Instance, ...args: T) => void;

const C3 = globalThis.C3;
const DinostructC3Actions: Record<string, Action> = {
    LogToConsole(this: DinostructC3Instance): void
    {
        // eslint-disable-next-line no-console
        console.log("This is the 'Log to console' action. Test property = " + this.testProperty);
    }
};

C3.Plugins.Dinobros_DinostructPlugin.Acts = DinostructC3Actions;

export default DinostructC3Actions;
