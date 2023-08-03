import { useContext } from "react";
import { WSChannelContext } from "..";

export const useSend = (
) => {
    const context = useContext(WSChannelContext);

    if (!context) throw new Error('WSChannelContext is not defined');

    return context.send;
};
