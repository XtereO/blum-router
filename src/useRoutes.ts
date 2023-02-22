import { useStore } from "effector-react";
import { useEffect } from "react";
import {
  $router,
  setActiveModal,
  setActivePanel,
  setActivePopout,
  setActiveView,
  _setActiveModal,
  _setActivePopout,
} from "./router";
import { useEventListener } from "./useEventListener";

export const useInitRouter = (
  options: InitRouteOptions,
  ...middlewares: RouteMiddleware[]
) => {
  const { activeView, activePanel, activeModal, activePopout } = useRouter();
  useEffect(() => {
    setActiveView(options.view);
    setActivePanel(options.panel);
    if (options.modal) {
      setActiveModal(options.modal);
    }
    if (options.popout) {
      setActivePopout(options.popout);
    }
  }, [options.view, options.panel, options.modal, options.popout]);
  useEffect(() => {
    const state = window.history.state ?? {
      view: undefined,
      panel: undefined,
      modal: undefined,
      popout: undefined,
    };
    if (
      state.view !== activeView ||
      state.panel !== activePanel ||
      state.modal !== activeModal ||
      state.popout !== activePopout
    ) {
      window.history.pushState(
        {
          view: activeView,
          panel: activePanel,
          modal: activeModal,
          popout: activePopout,
        },
        ""
      );
    }
  }, [activeView, activePanel, activeModal, activePopout]);

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
    await changeRoutes();
    window.isBackFromBrowser = true;
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
      window.history.pushState(storeRoutes, "");
      return false;
    }
    return true;
  };
};

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

type RouteMiddleware = (
  storeRoutes: Routes,
  prevRoutes: Routes
) => boolean | Promise<boolean>;
