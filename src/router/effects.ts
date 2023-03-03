import { blumRouter } from "src/blum-router";
import { BackHandlerOptions } from "src/types";
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
export const setActiveViewPanel = (routes: { view: string; panel: string }) => {
  blumRouter.historyPush({ view: routes.view, panel: routes.panel });
};
export const setActivePanel = (panel: string) => {
  blumRouter.historyPush({ panel });
};
export const setActiveModal = (modal: string) => {
  blumRouter.historyPush({ modal });
};
export const setActivePopout = (popout: string) => {
  blumRouter.historyPush({ popout });
};
