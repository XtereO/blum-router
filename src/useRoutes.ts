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
import { InitRouteOptions, RouteMiddleware, Routes } from "./types";
import { useBlumEventListener, useEventListener } from "./useEventListener";

export const useInitRouter = (
  options: InitRouteOptions,
  ...middlewares: RouteMiddleware[]
) => {
  const { activeView, activePanel, activeModal, activePopout, isRouteInit } =
    useRouter();
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
      if (window.blumRouter.isDispatchChangeStateEventBeforeMiddleware) {
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
          { view, panel, modal, popout }
        );
        if (!res) {
          return;
        }
      }
      if (window.blumRouter.isDispatchChangeStateEventAfterMiddleware) {
        blumRouter.dispatchChangeStateEvent();
      }
    };
    if (isRouteInit) {
      if (window.blumRouter.beforeBackHandledCallback) {
        window.blumRouter.beforeBackHandledCallback();
      }

      await changeRoutes();
      window.blumRouter.isBackFromBrowser = true;

      if (window.blumRouter.afterBackHandledCallback) {
        window.blumRouter.afterBackHandledCallback();
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
  callback?: (storeRoutes: Routes, prevRoutes: Routes) => void | Promise<void>
) => {
  return createCatchBackBrowserRouteMiddleware(
    route,
    (storeRoutes, prevRoutes) => {
      if (callback) {
        callback(storeRoutes, prevRoutes);
      }
      blumRouter.historyPush(storeRoutes);
    }
  );
};
export const createCatchBackBrowserRouteMiddleware = (
  route: string,
  callback?: (storeRoutes: Routes, prevRoutes: Routes) => void | Promise<void>
) => {
  return (storeRoutes: Routes, prevRoutes: Routes) => {
    const routes: (keyof Routes)[] = ["view", "panel", "modal", "popout"];
    if (
      routes.some(
        (r) => storeRoutes[r] === route && storeRoutes[r] !== prevRoutes[r]
      ) &&
      window.blumRouter.isBackFromBrowser
    ) {
      if (callback) {
        callback(storeRoutes, prevRoutes);
      }
      return false;
    }
    return true;
  };
};
