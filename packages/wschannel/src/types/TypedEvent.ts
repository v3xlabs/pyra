export interface Listener<T> {
    (event: T): any;
}

export interface Disposable {
    dispose(): any;
}

/** passes through events as they happen. You will not get events from before you start listening */
export class TypedEvent<T> {
    private listeners: Listener<T>[] = [];
    private listenersOncer: Listener<T>[] = [];

    on = (listener: Listener<T>): Disposable => {
        this.listeners.push(listener);

        return {
            dispose: () => this.off(listener),
        };
    };

    once = (listener: Listener<T>): void => {
        this.listenersOncer.push(listener);
    };

    off = (listener: Listener<T>) => {
        const callbackIndex = this.listeners.indexOf(listener);

        if (callbackIndex > -1) this.listeners.splice(callbackIndex, 1);
    };

    emit = (event: T) => {
        /** Update any general listeners */
        for (const listener of this.listeners) listener(event);

        /** Clear the `once` queue */
        if (this.listenersOncer.length > 0) {
            const toCall = this.listenersOncer;

            this.listenersOncer = [];

            for (const listener of toCall) listener(event);
        }
    };

    pipe = (te: TypedEvent<T>): Disposable => {
        return this.on((event) => te.emit(event));
    };
}
