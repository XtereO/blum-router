export declare const _setActiveView: import("effector").Event<string>;
export declare const _setActivePanel: import("effector").Event<string>;
export declare const _setActiveViewPanel: import("effector").Event<{
    view: string;
    panel: string;
}>;
export declare const _setActiveModal: import("effector").Event<string | null>;
export declare const _setActivePopout: import("effector").Event<string | null>;
export declare const initRoute: import("effector").Event<void>;
export declare const setBackHandled: import("effector").Event<boolean>;
