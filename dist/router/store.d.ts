type Store = {
    activeView: string | null;
    activePanel: string | null;
    activeModal: string | null;
    activePopout: string | null;
    isRouteInit: boolean;
    isBackHandled: boolean;
    isDispatchChangeStateEventBeforeMiddleware: boolean;
    isDispatchChangeStateEventAfterMiddleware: boolean;
    beforeBackHandledCallback: (() => void) | null;
    isBackFromBrowser: boolean;
    afterBackHandledCallback: (() => void) | null;
};
export declare const $router: import("effector").Store<Store>;
export {};
