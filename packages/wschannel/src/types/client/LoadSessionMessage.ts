import { WSBaseMessage } from "../Message";

type SessionData = {
    app: {
        name: string;
    }
}

/**
 * Message sent from the client to the server to indicate its session data.
 */
export type WSClientLoadSessionMessage = WSBaseMessage<'load_session', SessionData>;
