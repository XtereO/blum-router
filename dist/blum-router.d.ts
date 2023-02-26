import { Routes } from "./types";
export declare const blumRouter: {
    subscribers: Subscriber[];
    back(): void;
    historyPush(routes: Partial<Routes>): void;
    changeState(routes: BlumRouterEventMap["changestate"]): void;
    fireChangeStateEvent(): void;
    addEventListener<K extends keyof BlumRouterEventMap>(type: K, callback: (payload: BlumRouterEventMap[K]) => void, index: number): void;
    removeEventListener(index: number): void;
    _trigerEvent<K_1 extends keyof BlumRouterEventMap>(type: K_1, payload: BlumRouterEventMap[K_1]): void;
};
export declare const historyPush: (routes: Partial<Routes>) => void;
export declare const back: () => void;
export type BlumRouterEventMap = {
    changestate: Routes | null;
    init: boolean;
};
export type Subscriber = {
    type: keyof BlumRouterEventMap;
    callback: <K extends keyof BlumRouterEventMap>(payload: BlumRouterEventMap[K]) => void;
    index: number;
};
