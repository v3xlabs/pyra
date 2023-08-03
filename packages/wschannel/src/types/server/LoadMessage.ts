import { WSBaseMessage } from "../Message";

/**
 * Message sent from the server to the client to indicate that the server is ready to receive requests.
 */
export type WSServerLoadMessage = WSBaseMessage<'load'>;
