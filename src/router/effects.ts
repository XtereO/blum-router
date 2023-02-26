import { createEffect } from "effector";
import { blumRouter } from "src/blum-router";
import { Routes } from "src/types";

export const back = createEffect(() => {
  window.isBackFromBrowser = false;
  window.history.back();
});

export const historyPush = createEffect<Partial<Routes>, void>((routes) => {
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
});

export const setActiveViewPanel = createEffect<
  { view: string; panel: string },
  void
>((routes) => {
  historyPush({ view: routes.view, panel: routes.panel });
});
export const setActivePanel = createEffect<string, void>((panel) => {
  historyPush({ panel });
});
export const setActiveModal = createEffect<string, void>((modal) => {
  historyPush({ modal });
});
export const setActivePopout = createEffect<string, void>((popout) => {
  historyPush({ popout });
});
