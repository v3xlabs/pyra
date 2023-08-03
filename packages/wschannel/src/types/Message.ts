import { WSClientMessage, WSServerMessage } from "..";
import { ServerOrClient } from "./ServerOrClient";

export type WSBaseMessage<Goal extends string, GoalData = undefined> = {
    type: 'walletselect';
    goal: Goal;
    data?: GoalData;
};

export type WSMessage<S extends ServerOrClient> = S extends 'server' ? WSServerMessage : WSClientMessage;
