import { BlumRouterEventKey } from "./blum-router";
export declare const useEventListener: <K extends keyof WindowEventMap>(eventListen: K, callback: (e: WindowEventMap[K]) => void, eventKey?: string) => void;
export declare const useBlumEventListener: <K extends "changestate">(eventListen: K, callback: (payload: BlumRouterEventKey[K]) => void, index: number) => void;
