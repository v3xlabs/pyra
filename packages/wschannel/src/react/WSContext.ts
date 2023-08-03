import { createContext } from 'react';
import { WSMessage } from '../types/Message';
import { TypedEvent } from '../types/TypedEvent';
import { InverseServerOrClient, ServerOrClient } from '../types/ServerOrClient';

export type WSChannelConfig<S extends ServerOrClient> = {
    type: S;
};

type WSChannelContextBaseT<S extends ServerOrClient, R extends ServerOrClient = InverseServerOrClient<S>> = {
    type: S;
    receive?: TypedEvent<WSMessage<R>>;
    send?: (message: WSMessage<S>) => void;
    connect?: () => void;
};

export type WSChannelContextT<S extends ServerOrClient, R extends ServerOrClient = InverseServerOrClient<S>> =
    WSChannelContextBaseT<S, R>

export const WSChannelContext = createContext<WSChannelContextT<ServerOrClient>>({ type: 'client', receive: undefined, send: undefined });
