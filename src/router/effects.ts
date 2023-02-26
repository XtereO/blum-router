import { historyPush } from "src/blum-router";

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
