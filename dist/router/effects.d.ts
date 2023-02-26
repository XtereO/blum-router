import { Routes } from "src/types";
export declare const back: import("effector").Effect<void, void, Error>;
export declare const historyPush: import("effector").Effect<Partial<Routes>, void, Error>;
export declare const setActiveViewPanel: import("effector").Effect<{
    view: string;
    panel: string;
}, void, Error>;
export declare const setActivePanel: import("effector").Effect<string, void, Error>;
export declare const setActiveModal: import("effector").Effect<string, void, Error>;
export declare const setActivePopout: import("effector").Effect<string, void, Error>;
