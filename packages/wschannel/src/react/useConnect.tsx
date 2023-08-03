import { useCallback, useContext } from "react";
import { WSChannelContext } from ".";

export const useConnect = () => {
    const context = useContext(WSChannelContext);

    if (!context) throw new Error('No WSChannelContext found, did you forget to wrap your app in a <WSProvider>?');

    if (context.type !== 'client') throw new Error('useConnect can only be used in a client context.');

    if (!context.connect) throw new Error('Client not setup to handle connections');

    const connect = useCallback((url: string = 'https://wallet.select') => {
        const width = 400;
        const height = 600;
        const parameters = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
    width=${width},height=${height},top=${screen.height / 2 - height / 2
            },left=${screen.width / 2 - width / 2}`;

        const nwin = open(
            new URL('/sign', url),
            'test',
            parameters
        );

        if (!nwin) return;

        context.connect!(nwin);

        return nwin;
    }, [context]);

    return { connect };
};
