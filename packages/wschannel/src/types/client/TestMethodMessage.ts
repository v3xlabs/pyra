import { WSBaseMessage } from "../Message";

type SessionData = {
    foo: 'bar'
}

/**
 * Message sent from the client to the server to indicate its session data.
 */
export type WSClientTestMessage = WSBaseMessage<'test_A', SessionData>;
