import { Routes } from "./types";
export declare const blumRouter: {
    isDispatchChangeStateEventBeforeMiddleware: boolean;
    isDispatchChangeStateEventAfterMiddleware: boolean;
    beforeBackHandledCallback: (() => void) | null;
    isBackFromBrowser: boolean;
    afterBackHandledCallback: (() => void) | null;
    subscribers: Subscriber[];
    setDefaultBackHandlerOptions(): void;
    setBackHandlerOptions(options: BackHandlerOptions): void;
    historyPush(routes: Partial<Routes>): void;
    changeState(routes: BlumRouterEventMap["changestate"]): void;
    dispatchChangeStateEvent(): void;
    addEventListener<K extends keyof BlumRouterEventMap>(type: K, callback: (payload: BlumRouterEventMap[K]) => void, index: number): void;
    removeEventListener(index: number): void;
    _trigerEvent<K_1 extends keyof BlumRouterEventMap>(type: K_1, payload: BlumRouterEventMap[K_1]): void;
};
export type BlumRouterEventMap = {
    changestate: Routes | null;
    init: boolean;
};
export type Subscriber = {
    type: keyof BlumRouterEventMap;
    callback: <K extends keyof BlumRouterEventMap>(payload: BlumRouterEventMap[K]) => void;
    index: number;
};
export type BackHandlerOptions = {
    beforeBackHandledCallback?: (() => void) | null;
    afterBackHandledCallback?: (() => void) | null;
    isDispatchChangeStateEventBeforeMiddleware?: boolean;
    isDispatchChangeStateEventAfterMiddleware?: boolean;
    isBackFromBrowser?: boolean;
};
