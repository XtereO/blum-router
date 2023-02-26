import { BlumRouterEventMap } from "./blum-router";
export declare const useEventListener: <K extends keyof WindowEventMap>(eventListen: K, callback: (e: WindowEventMap[K]) => void, eventKey?: string) => void;
export declare const useBlumEventListener: <K extends keyof BlumRouterEventMap>(eventListen: K, callback: (payload: BlumRouterEventMap[K]) => void, index: number) => void;
