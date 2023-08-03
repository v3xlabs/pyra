import { useContext, useEffect, useState } from "react";
import { WSGoals, WSGoalsData, WSMessage } from "..";
import { Optional } from "../types/Optional";
import { InverseServerOrClient, ServerOrClient } from "../types/ServerOrClient";
import { WSChannelContext } from "./WSContext";

export const useGoal = <
    M extends ServerOrClient = 'server',
    R extends ServerOrClient = InverseServerOrClient<M>,
    G extends WSGoals<R> = WSGoals<R>,
    D extends WSGoalsData<R, G> = WSGoalsData<R, G>,
    O = any
>(
    goal: G,
    function_: (message: D, send?: (message: WSMessage<R>) => void) => O | Promise<O>,
    options?: {
        type?: M;
    }
): Optional<O> => {
    const [result, setResult] = useState<O | undefined>(undefined);
    const type = options?.type ?? 'server';
    console.log(type);

    const context = useContext(WSChannelContext);

    if (!context) throw new Error('WSChannelContext is not defined');

    useEffect(() => {
        context.receive?.on(async (event) => {
            if (event.goal === goal) {
                setResult(await function_(event.data as D, context.send));
            }
        });
    }, []);

    return result;
};
