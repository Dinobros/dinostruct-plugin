import type { SingleGlobalInstance } from "./instance";

const C3 = globalThis.C3;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Action<T extends unknown[] = any[]> = (this: SingleGlobalInstance, ...args: T) => void;

export const SingleGlobalActions = {
    LogToConsole(this: SingleGlobalInstance): void
    {
        // eslint-disable-next-line no-console
        console.log("This is the 'Log to console' action. Test property = " + this.testProperty);
    }

} satisfies Record<string, Action>;

C3.Plugins.Dinobros_Construct3PluginTemplate.Acts = SingleGlobalActions;
