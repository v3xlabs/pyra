import * as React from 'react';

import { PropsWithChildren, useState } from "react";
import { WSChannelConfig, WSChannelContextT, WSChannelContext } from "./WSContext";
import { ServerOrClient } from "../types/ServerOrClient";
import { TypedEvent } from '../types/TypedEvent';
import { WSMessage } from '../types/Message';

export const WSProvider = <S extends ServerOrClient = 'client', Config extends WSChannelConfig<S> = WSChannelConfig<S>>({ children, config }: PropsWithChildren<{ config: Config }>) => {
    const [state, setState] = useState<WSChannelContextT<S>>();

    React.useEffect(() => {
        const type = config.type;

        if (type === 'client') {
            console.log('Mounting Client');

            const send = new TypedEvent<WSMessage<'client'>>();
            const receive = new TypedEvent<WSMessage<'server'>>();
            const windowCallbacks: Record<string, {
                portal: Window;
                functions: Function[];
            }> = {};

            const state: WSChannelContextT<'client'> = {
                type: 'client',
                connect: (portal) => {
                    if (!portal) throw new Error('No window to connect to, please specify one.');

                    const receiveCallback = (event: MessageEvent) => {
                        if (event?.data['type'] !== 'walletselect') return;

                        receive.emit(event.data);
                    };

                    const curportal = windowCallbacks[portal.name] || {
                        portal,
                        functions: [],
                    };

                    windowCallbacks[portal.name] = curportal;

                    portal.addEventListener('message', receiveCallback);

                    send.on((message) => {
                        portal.postMessage(message, '*');
                    });

                    curportal.functions.push(receiveCallback);
                },
                send: send.emit,
                receive,
            };

            // @ts-ignore
            setState(state);

            return () => {
                for (let key of Object.keys(windowCallbacks)) {
                    const { portal, functions } = windowCallbacks[key];
                    for (let callback of functions) {
                        portal.removeEventListener('message', callback as any);
                    }
                }
            };
        }
        if (type === 'server') {
            console.log('Mounting Server');

            if (!window.opener) {
                throw new Error('No window.opener');
                return;
            }

            const opener = window.opener as Window;

            const receive = new TypedEvent<WSMessage<'client'>>();

            const send = (message: WSMessage<'server'>) => {
                opener.postMessage(message, '*');
            };

            const callback = (event: MessageEvent) => {
                if (event?.data['type'] !== 'walletselect') return;

                receive.emit(event.data);
            };

            window.addEventListener('message', callback);

            const state: WSChannelContextT<'server'> = {
                type: 'server',
                receive,
                send,
            };
            // @ts-ignore
            setState(state);

            return () => {
                window.removeEventListener('message', callback);
            };
        }

        return () => { };
    }, []);

    if (!state) return <></>;

    return (
        <WSChannelContext.Provider value={state}>
            {children}
        </WSChannelContext.Provider>
    );
};
