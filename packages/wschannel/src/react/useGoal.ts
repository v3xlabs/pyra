import { useCallback, useContext, useEffect, useState } from "react";
import { WSGoals, WSGoalsData, WSMessage } from "..";
import { Optional } from "../types/Optional";
import { InverseServerOrClient, ServerOrClient } from "../types/ServerOrClient";
import { WSChannelContext } from "./WSContext";

export const useGoal = <
    M extends ServerOrClient = 'client',
    R extends ServerOrClient = InverseServerOrClient<M>,
    G extends WSGoals<R> = WSGoals<R>,
    D extends WSGoalsData<R, G> = WSGoalsData<R, G>,
    O = any
>(
    goal: G,
    function_: (message: D, send?: (message: WSMessage<M>) => void) => O | Promise<O>,
    options?: {
        type?: M;
    }
): Optional<O> => {
    const [result, setResult] = useState<O | undefined>(undefined);
    // @ts-ignore
    const sType = options?.type ?? 'server';

    const context = useContext(WSChannelContext);

    if (!context) throw new Error('WSChannelContext is not defined');

    useEffect(() => {
        const fnfun = async (event: WSMessage<M>) => {
            if (event.goal === goal) {
                setResult(await function_(event.data as D, context.send));
            }
        };

        context.receive?.on(fnfun as any);

        return () => {
            context.receive?.off(fnfun as any);
        }
    }, []);

    return result;
};
