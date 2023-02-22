export declare const useInitRouter: (options: InitRouteOptions, ...middlewares: RouteMiddleware[]) => void;
export declare const useRouter: () => {
    activeView: string | null;
    activePanel: string | null;
    activeModal: string | null;
    activePopout: string | null;
};
export declare const createRouteMiddleware: (callback: RouteMiddleware) => RouteMiddleware;
export declare const createDisableBackBrowserRouteMiddleware: (route: string, callback?: ((storeRoutes: Routes, prevRoutes: Routes) => void | Promise<void>) | undefined) => (storeRoutes: Routes, prevRoutes: Routes) => boolean;
type InitRouteOptions = {
    view: string;
    panel: string;
    modal?: string | null;
    popout?: string | null;
};
type Routes = {
    view: string | null;
    panel: string | null;
    modal: string | null;
    popout: string | null;
};
type RouteMiddleware = (storeRoutes: Routes, prevRoutes: Routes) => boolean | Promise<boolean>;
export {};
