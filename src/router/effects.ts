import { blumRouter } from "src/blum-router";
import { Routes } from "src/types";

export const back = () => {
  window.isBackFromBrowser = false;
  window.history.back();
};

export const historyPush = (routes: Partial<Routes>) => {
  const { view, panel, modal, popout } = window.history.state ?? {
    view: undefined,
    panel: undefined,
    modal: undefined,
    popout: undefined,
  };
  console.log("try to push history", blumRouter.subscribers);
  blumRouter.changeState({
    view: routes.hasOwnProperty("view") ? routes.view : view,
    panel: routes.hasOwnProperty("panel") ? routes.panel : panel,
    modal: routes.hasOwnProperty("modal") ? routes.modal : modal,
    popout: routes.hasOwnProperty("popout") ? routes.popout : popout,
  });
};

export const setActiveViewPanel = (routes: { view: string; panel: string }) => {
  historyPush({ view: routes.view, panel: routes.panel });
};
export const setActivePanel = (panel: string) => {
  historyPush({ panel });
};
export const setActiveModal = (modal: string) => {
  historyPush({ modal });
};
export const setActivePopout = (popout: string) => {
  historyPush({ popout });
};
