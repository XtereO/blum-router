import { Routes } from "src/types";
export declare const back: () => void;
export declare const historyPush: (routes: Partial<Routes>) => void;
export declare const setActiveViewPanel: (routes: {
    view: string;
    panel: string;
}) => void;
export declare const setActivePanel: (panel: string) => void;
export declare const setActiveModal: (modal: string) => void;
export declare const setActivePopout: (popout: string) => void;
