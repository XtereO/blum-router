import { useStore } from "effector-react";
import { useEffect } from "react";
import {
  $router,
  historyPush,
  initRoute,
  setActiveModal,
  setActivePanel,
  setActivePopout,
  setActiveView,
  _setActiveModal,
  _setActivePopout
} from "./router";
import { InitRouteOptions, RouteMiddleware, Routes } from "./types";
import { useEventListener } from "./useEventListener";

export const useInitRouter = (
  options: InitRouteOptions,
  ...middlewares: RouteMiddleware[]
) => {
  const { activeView, activePanel, activeModal, activePopout, isRouteInit } =
    useRouter();
  useEffect(() => {
    if (!isRouteInit) {
      setActiveView(options.view);
      setActivePanel(options.panel);
      if (options.modal) {
        setActiveModal(options.modal);
      }
      if (options.popout) {
        setActivePopout(options.popout);
      }
      initRoute();
    }
  }, [isRouteInit, options.view, options.panel, options.modal, options.popout]);
  useEffect(() => {
    const state = window.history.state ?? {
      view: undefined,
      panel: undefined,
      modal: undefined,
      popout: undefined,
    };
    if (
      isRouteInit &&
      (state.view !== activeView ||
        state.panel !== activePanel ||
        state.modal !== activeModal ||
        state.popout !== activePopout)
    ) {
      historyPush({
        view: activeView,
        panel: activePanel,
        modal: activeModal,
        popout: activePopout,
      });
    }
  }, [activeView, activePanel, activeModal, activePopout, isRouteInit]);

  useEventListener("popstate", async () => {
    const changeRoutes = async () => {
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
      setActiveView(view);
      setActivePanel(panel);
      _setActiveModal(modal);
      _setActivePopout(popout);
    };
    if (isRouteInit) {
      await changeRoutes();
      window.isBackFromBrowser = true;
    }
  });
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
