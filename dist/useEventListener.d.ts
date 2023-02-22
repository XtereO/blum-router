export declare const useEventListener: <K extends keyof WindowEventMap>(eventListen: K, callback: (e: WindowEventMap[K]) => void, eventKey?: string) => void;
