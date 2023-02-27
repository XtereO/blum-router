import { blumRouter } from "src/blum-router";

export const back = () => {
  window.isBackFromBrowser = false;
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
