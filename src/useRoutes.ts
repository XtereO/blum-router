import { useStore } from "effector-react";
import { useEffect } from "react";
import {
  $router,
  historyPush,
  initRoute,
  setBackHandled,
  _setActiveModal,
  _setActivePanel,
  _setActivePopout,
  _setActiveView,
} from "./router";
import { InitRouteOptions, RouteMiddleware, Routes } from "./types";
import { useEventListener } from "./useEventListener";
import {
  $virtualRouter,
  setActiveModal,
  setActivePanel,
  setActivePopout,
  setActiveView,
} from "./virtual-router";

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
    isBackHandled,
  } = useRouter();
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

  const { virtualView, virtualPanel, virtualModal, virtualPopout } =
    useStore($virtualRouter);
  useEffect(() => {
    const state = window.history.state ?? {
      view: undefined,
      panel: undefined,
      modal: undefined,
      popout: undefined,
    };
    if (
      isRouteInit &&
      isBackHandled &&
      (state.view !== virtualView ||
        state.panel !== virtualPanel ||
        state.modal !== virtualModal ||
        state.popout !== virtualPopout)
    ) {
      _setActiveView(virtualView as string);
      _setActivePanel(virtualPanel as string);
      _setActiveModal(virtualModal);
      _setActivePopout(virtualPopout);
      historyPush({
        view: virtualView,
        panel: virtualPanel,
        modal: virtualModal,
        popout: virtualPopout,
      });
    }
  }, [
    virtualView,
    virtualPanel,
    virtualModal,
    virtualPopout,
    isRouteInit,
    isBackHandled,
  ]);

  useEventListener("popstate", async () => {
    const changeRoutes = async () => {
      setBackHandled(false);
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
      _setActiveView(view);
      _setActivePanel(panel);
      _setActiveModal(modal);
      _setActivePopout(popout);
      setBackHandled(true);
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
