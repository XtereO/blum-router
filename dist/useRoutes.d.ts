import { BackHandlerOptions, InitRouteOptions, RouteMiddleware, Routes } from "./types";
export declare const useInitRouter: (options: InitRouteOptions, ...middlewares: RouteMiddleware[]) => void;
export declare const useRouter: () => {
    activeView: string | null;
    activePanel: string | null;
    activeModal: string | null;
    activePopout: string | null;
    isRouteInit: boolean;
    routeOptions: import("./types").SetRouteOptions | null;
    isBackHandled: boolean;
    isDispatchChangeStateEventBeforeMiddleware: boolean;
    isDispatchChangeStateEventAfterMiddleware: boolean;
    beforeBackHandledCallback: ((storeRoutes: Routes, prevRoutes: Routes) => void) | null;
    isBackFromBrowser: boolean;
    afterBackHandledCallback: ((storeRoutes: Routes, prevRoutes: Routes) => void) | null;
};
export declare const createRouteMiddleware: (callback: RouteMiddleware) => RouteMiddleware;
export declare const createDisableBackBrowserRouteMiddleware: (route: string, callback?: ((storeRoutes: Routes, prevRoutes: Routes, options: BackHandlerOptions) => (void | boolean) | Promise<void | boolean>) | undefined) => (storeRoutes: Routes, prevRoutes: Routes, options: BackHandlerOptions) => Promise<boolean>;
export declare const createCatchBackBrowserRouteMiddleware: (route: string, callback?: ((storeRoutes: Routes, prevRoutes: Routes, options: BackHandlerOptions) => (void | boolean) | Promise<void | boolean>) | undefined) => (storeRoutes: Routes, prevRoutes: Routes, options: BackHandlerOptions) => Promise<boolean>;
