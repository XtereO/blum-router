import { InitRouteOptions, RouteMiddleware, Routes } from "./types";
export declare const useInitRouter: (options: InitRouteOptions, ...middlewares: RouteMiddleware[]) => void;
export declare const useRouter: () => {
    activeView: string | null;
    activePanel: string | null;
    activeModal: string | null;
    activePopout: string | null;
    isRouteInit: boolean;
    isBackHandled: boolean;
};
export declare const createRouteMiddleware: (callback: RouteMiddleware) => RouteMiddleware;
export declare const createDisableBackBrowserRouteMiddleware: (route: string, callback?: ((storeRoutes: Routes, prevRoutes: Routes) => void | Promise<void>) | undefined) => (storeRoutes: Routes, prevRoutes: Routes) => boolean;
export declare const createCatchBackBrowserRouteMiddleware: (route: string, callback?: ((storeRoutes: Routes, prevRoutes: Routes) => void | Promise<void>) | undefined) => (storeRoutes: Routes, prevRoutes: Routes) => boolean;
