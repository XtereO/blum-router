import { BackHandlerOptions, SetRouteOptions } from "src/types";
export declare const back: (options?: BackHandlerOptions) => void;
export declare const setActiveViewPanel: (routes: {
    view: string;
    panel: string;
}, options?: SetRouteOptions) => void;
export declare const setActivePanel: (panel: string, options?: SetRouteOptions) => void;
export declare const setActiveModal: (modal: string, options?: SetRouteOptions) => void;
export declare const setActivePopout: (popout: string, options?: SetRouteOptions) => void;
