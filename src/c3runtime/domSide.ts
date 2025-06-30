/*
 * Note: This file is imported as a CommonJS module, so you can't use ES6 imports / exports.
 */

import type { Message } from "@/core/types";

class DomHandler extends DOMHandler
{
    protected _onPostMessage = async (event: MessageEvent): Promise<void> =>
    {
        const result = await this.PostToRuntimeAsync("dinobros:dinostruct:dom", {
            action: "window:message:receive",
            data: event.data
        });

        if (result !== true)
        {
            throw new Error(
                "The message received from the window isn't in the expected format. " +
                "Check your implementation."
            );
        }
    };

    protected _onRuntimeMessage = async (message: unknown): Promise<JSONValue> =>
    {
        if (!(message instanceof Object) || !("action" in message))
        {
            throw new Error(
                "The message received from the runtime isn't in the expected format. " +
                "Check your implementation."
            );
        }

        switch (message.action)
        {
            case "browser:info":
                return this.getBrowserInfo();

            case "parent:message:send":
            {
                const { data, targetOrigin } = message as Message;

                return this.postMessageToParent(data, targetOrigin);
            }

            default:
                throw new Error(
                    `The message received from the runtime has an unknown action: ${message.action}. ` +
                    "Check your implementation."
                );
        }
    };

    public constructor(runtime: IRuntimeInterface)
    {
        super(runtime, "dinobros-dinostruct_plugin-dom_handler");

        this.AddRuntimeMessageHandler("dinobros:dinostruct:runtime", this._onRuntimeMessage);

        window.addEventListener("message", this._onPostMessage);
    }

    public getBrowserInfo(): JSONValue
    {
        let displayMode: string;
        if (window.matchMedia("(display-mode: standalone)").matches)
        {
            displayMode = "standalone";
        }
        else if (window.matchMedia("(display-mode: minimal-ui)").matches)
        {
            displayMode = "minimal-ui";
        }
        else if (window.matchMedia("(display-mode: fullscreen)").matches)
        {
            displayMode = "fullscreen";
        }
        else
        {
            displayMode = "browser";
        }

        return {
            displayMode: displayMode,
            language: window.navigator.language,
            screen: {
                width: window.screen.width,
                height: window.screen.height,
                orientation: window.screen.orientation.type,
                colorDepth: window.screen.colorDepth,
                pixelDepth: window.screen.pixelDepth,
                maxTouchPoints: window.navigator.maxTouchPoints
            },
            userAgent: window.navigator.userAgent
        };
    }

    public postMessageToParent(message: unknown, targetOrigin = "/"): boolean
    {
        window.parent.postMessage(message, targetOrigin);

        return true;
    }
}

RuntimeInterface.AddDOMHandlerClass(DomHandler);
