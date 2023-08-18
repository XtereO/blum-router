import { blumRouter } from "src/blum-router";
import { BackHandlerOptions, SetRouteOptions } from "src/types";
import { setBackHandlerOptions } from "./event";

export const back = (options?: BackHandlerOptions) => {
  if (options) {
    setBackHandlerOptions({ ...options, isBackHandled: false });
  }
  if (
    !options ||
    !(options as BackHandlerOptions).hasOwnProperty("isBackFromBrowser")
  ) {
    setBackHandlerOptions({ isBackFromBrowser: false });
  }
  window.history.back();
};
export const setActiveViewPanel = (
  routes: { view: string; panel: string },
  options?: SetRouteOptions
) => {
  blumRouter.historyPush({ view: routes.view, panel: routes.panel }, options);
};
export const setActivePanel = (panel: string, options?: SetRouteOptions) => {
  blumRouter.historyPush({ panel }, options);
};
export const setActiveModal = (modal: string, options?: SetRouteOptions) => {
  blumRouter.historyPush({ modal }, options);
};
export const setActivePopout = (popout: string, options?: SetRouteOptions) => {
  blumRouter.historyPush({ popout }, options);
};
