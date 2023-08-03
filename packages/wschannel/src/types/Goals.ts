import { WSBaseMessage, WSMessage } from "./Message";
import { ServerOrClient } from "./ServerOrClient";

export type GoalExtractor<T> = T extends WSBaseMessage<infer Goal, any> ? Goal : never;
export type GoalDataExtractor<T> = T extends WSBaseMessage<any, infer GoalData> ? GoalData : never;

export type WSGoals<S extends ServerOrClient> = GoalExtractor<WSMessage<S>>;
export type WSGoalsData<S extends ServerOrClient, G extends WSGoals<S>> = GoalDataExtractor<WSMessage<S> & { goal: G }>;