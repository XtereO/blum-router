import { Routes, SetRouteOptions } from "src/types";
type Store = {
    activeView: string | null;
    activePanel: string | null;
    activeModal: string | null;
    activePopout: string | null;
    isRouteInit: boolean;
    routeOptions: SetRouteOptions | null;
    isBackHandled: boolean;
    isDispatchChangeStateEventBeforeMiddleware: boolean;
    isDispatchChangeStateEventAfterMiddleware: boolean;
    beforeBackHandledCallback: ((storeRoutes: Routes, prevRoutes: Routes) => void) | null;
    isBackFromBrowser: boolean;
    afterBackHandledCallback: ((storeRoutes: Routes, prevRoutes: Routes) => void) | null;
};
export declare const $router: import("effector").Store<Store>;
export {};
