import { Routes } from "./types";
export declare const blumRouter: {
    subscribers: Subscriber[];
    changeState(routes: BlumRouterEventKey["changestate"]): void;
    fireChangeStateEvent(): void;
    addEventListener(type: keyof BlumRouterEventKey, callback: Subscriber["callback"], index: number): void;
    removeEventListener(index: number): void;
    _trigerEvent<K extends "changestate">(type: K, payload: BlumRouterEventKey[K]): void;
};
export type BlumRouterEventKey = {
    changestate: Routes | null;
};
export type Subscriber = {
    type: keyof BlumRouterEventKey;
    callback: (payload: BlumRouterEventKey[keyof BlumRouterEventKey]) => void;
    index: number;
};
