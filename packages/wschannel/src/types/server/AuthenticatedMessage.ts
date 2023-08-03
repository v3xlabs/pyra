import { WSBaseMessage } from "../Message";

/**
 * Message sent from the server to the client to indicate that the server has authenticated
 */
export type WSServerAuthenticatedMessage = WSBaseMessage<'auth_success', { user: string }>;
