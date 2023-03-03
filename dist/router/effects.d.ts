import { BackHandlerOptions } from "src/types";
export declare const back: (options?: BackHandlerOptions) => void;
export declare const setActiveViewPanel: (routes: {
    view: string;
    panel: string;
}) => void;
export declare const setActivePanel: (panel: string) => void;
export declare const setActiveModal: (modal: string) => void;
export declare const setActivePopout: (popout: string) => void;
