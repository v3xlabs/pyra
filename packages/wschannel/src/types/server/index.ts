import { GoalExtractor } from "../Goals";
import { WSServerAuthenticatedMessage } from "./AuthenticatedMessage";
import { WSServerLoadMessage } from "./LoadMessage";

export type WSServerMessage = WSServerLoadMessage | WSServerAuthenticatedMessage;
export type WSServerGoals = GoalExtractor<WSServerMessage>;
