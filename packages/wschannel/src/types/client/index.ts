import { GoalExtractor } from "../Goals";
import { WSClientLoadSessionMessage } from "./LoadSessionMessage";
import { WSClientTestMessage } from "./TestMethodMessage";

export type WSClientMessage = WSClientLoadSessionMessage | WSClientTestMessage;

export type WSClientGoals = GoalExtractor<WSClientMessage>;
