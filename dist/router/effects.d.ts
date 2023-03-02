export declare const back: (options?: BackHandlerOptions) => void;
export declare const setBackHandlerOptions: ({ beforeBackHandledCallback, afterBackHandledCallback, isDispatchChangeStateEventAfterMiddleware, isDispatchChangeStateEventBeforeMiddleware, }: BackHandlerOptions) => void;
export declare const setActiveViewPanel: (routes: {
    view: string;
    panel: string;
}) => void;
export declare const setActivePanel: (panel: string) => void;
export declare const setActiveModal: (modal: string) => void;
export declare const setActivePopout: (popout: string) => void;
type BackHandlerOptions = {
    beforeBackHandledCallback?: (() => void) | null;
    afterBackHandledCallback?: (() => void) | null;
    isDispatchChangeStateEventBeforeMiddleware?: boolean;
    isDispatchChangeStateEventAfterMiddleware?: boolean;
};
export {};
