import { useStore } from "effector-react";
import { blumRouter } from "./blum-router";
import {
  $router,
  initRoute,
  setDefaultBackHandlerOptions,
  _setActiveModal,
  _setActivePopout,
  _setActiveViewPanel,
} from "./router";
import {
  BackHandlerOptions,
  InitRouteOptions,
  RouteMiddleware,
  Routes,
} from "./types";
import { useBlumEventListener, useEventListener } from "./useEventListener";

export const useInitRouter = (
  options: InitRouteOptions,
  ...middlewares: RouteMiddleware[]
) => {
  const {
    activeView,
    activePanel,
    activeModal,
    activePopout,
    isRouteInit,
    isDispatchChangeStateEventBeforeMiddleware,
    isDispatchChangeStateEventAfterMiddleware,
    isBackHandled,
    isBackFromBrowser,
    afterBackHandledCallback,
    beforeBackHandledCallback,
  } = useRouter();
  useBlumEventListener(
    "init",
    (payload) => {
      console.log("[blum]: initialized", payload);
      if (!isRouteInit) {
        setDefaultBackHandlerOptions();
        blumRouter.historyPush(options);
      }
    },
    1,
    [isRouteInit]
  );

  useEventListener("popstate", async () => {
    const changeRoutes = async () => {
      if (isDispatchChangeStateEventBeforeMiddleware) {
        blumRouter.dispatchChangeStateEvent();
      }
      const { view, panel, modal, popout } = window.history.state ?? {
        view: undefined,
        panel: undefined,
        modal: undefined,
        popout: undefined,
      };
      console.log("prevRoutes", view, panel, modal, popout);
      console.log(
        "storeRoutes",
        activeView,
        activePanel,
        activeModal,
        activePopout
      );

      for (const i in middlewares) {
        const res = await middlewares[i](
          {
            view: activeView,
            panel: activePanel,
            modal: activeModal,
            popout: activePopout,
          },
          { view, panel, modal, popout },
          {
            isBackHandled,
            isBackFromBrowser,
            isDispatchChangeStateEventAfterMiddleware,
            isDispatchChangeStateEventBeforeMiddleware,
            beforeBackHandledCallback,
            afterBackHandledCallback,
          }
        );
        if (!res) {
          return;
        }
      }
      if (isDispatchChangeStateEventAfterMiddleware) {
        blumRouter.dispatchChangeStateEvent();
      }
    };
    if (isRouteInit) {
      if (beforeBackHandledCallback) {
        beforeBackHandledCallback();
      }

      await changeRoutes();

      if (afterBackHandledCallback) {
        afterBackHandledCallback();
      }

      setDefaultBackHandlerOptions();
    }
  });
  useBlumEventListener(
    "changestate",
    (payload) => {
      console.log("[blum]: state changed", payload);
      if (payload) {
        const { view, panel, modal, popout } = payload;
        if (view && panel) {
          _setActiveViewPanel({ view, panel });
        }
        _setActiveModal(modal);
        _setActivePopout(popout);
        if (!isRouteInit) {
          initRoute();
        }
      }
    },
    2,
    [isRouteInit]
  );
};

export const useRouter = () => useStore($router);

export const createRouteMiddleware = (callback: RouteMiddleware) => callback;
export const createDisableBackBrowserRouteMiddleware = (
  route: string,
  callback?: (
    storeRoutes: Routes,
    prevRoutes: Routes,
    options: BackHandlerOptions
  ) => (void | boolean) | Promise<void | boolean>
) => {
  return createCatchBackBrowserRouteMiddleware(
    route,
    async (storeRoutes, prevRoutes, options) => {
      let res: boolean | void = undefined;
      if (callback) {
        res = await callback(storeRoutes, prevRoutes, options);
      }
      blumRouter.historyPush(storeRoutes);
      if (typeof res === "boolean") {
        return res;
      }
    }
  );
};
export const createCatchBackBrowserRouteMiddleware = (
  route: string,
  callback?: (
    storeRoutes: Routes,
    prevRoutes: Routes,
    options: BackHandlerOptions
  ) => (void | boolean) | Promise<void | boolean>
) => {
  return async (
    storeRoutes: Routes,
    prevRoutes: Routes,
    options: BackHandlerOptions
  ) => {
    const routes: (keyof Routes)[] = ["view", "panel", "modal", "popout"];
    if (
      routes.some(
        (r) => storeRoutes[r] === route && storeRoutes[r] !== prevRoutes[r]
      ) &&
      options.isBackFromBrowser
    ) {
      if (callback) {
        const res = await callback(storeRoutes, prevRoutes, options);
        if (typeof res === "boolean") {
          return res;
        }
      }
      return false;
    }
    return true;
  };
};
