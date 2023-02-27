type Store = {
    activeView: string | null;
    activePanel: string | null;
    activeModal: string | null;
    activePopout: string | null;
    isRouteInit: boolean;
    isBackHandled: boolean;
};
export declare const $router: import("effector").Store<Store>;
export {};
