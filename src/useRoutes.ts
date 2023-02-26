import { useStore } from "effector-react";
import { useEffect } from "react";
import { blumRouter } from "./blum-router";
import {
  $router,
  historyPush,
  initRoute,
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
  useEffect(() => {
    if (!isRouteInit) {
      historyPush(options);
      initRoute();
    }
  }, [isRouteInit, options]);

  useEventListener("popstate", async () => {
    const changeRoutes = async () => {
      blumRouter.fireChangeStateEvent();
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
    };
    if (isRouteInit) {
      await changeRoutes();
      window.isBackFromBrowser = true;
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
      }
    },
    1
  );
};

export const useRouter = () => useStore($router);

export const createRouteMiddleware = (callback: RouteMiddleware) => callback;
export const createDisableBackBrowserRouteMiddleware = (
  route: string,
  callback?: (storeRoutes: Routes, prevRoutes: Routes) => void | Promise<void>
) => {
  return (storeRoutes: Routes, prevRoutes: Routes) => {
    const routes: (keyof Routes)[] = ["view", "panel", "modal", "popout"];
    if (
      routes.some(
        (r) => storeRoutes[r] === route && storeRoutes[r] !== prevRoutes[r]
      ) &&
      window.isBackFromBrowser
    ) {
      if (callback) {
        callback(storeRoutes, prevRoutes);
      }
      historyPush(storeRoutes);
      return false;
    }
    return true;
  };
};
