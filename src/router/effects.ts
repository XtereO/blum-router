import { blumRouter } from "src/blum-router";

export const back = (options?: BackHandlerOptions) => {
  if (options) {
    setBackHandlerOptions(options);
  }
  window.blumRouter.isBackFromBrowser = false;
  window.history.back();
};
export const setBackHandlerOptions = ({
  beforeBackHandledCallback,
  afterBackHandledCallback,
  isDispatchChangeStateEventAfterMiddleware,
  isDispatchChangeStateEventBeforeMiddleware,
}: BackHandlerOptions) => {
  if (beforeBackHandledCallback) {
    window.blumRouter.beforeBackHandledCallback = beforeBackHandledCallback;
  }
  if (afterBackHandledCallback) {
    window.blumRouter.afterBackHandledCallback = afterBackHandledCallback;
  }
  if (typeof isDispatchChangeStateEventAfterMiddleware === "boolean") {
    window.blumRouter.isDispatchChangeStateEventAfterMiddleware =
      isDispatchChangeStateEventAfterMiddleware;
  }
  if (typeof isDispatchChangeStateEventBeforeMiddleware === "boolean") {
    window.blumRouter.isDispatchChangeStateEventBeforeMiddleware =
      isDispatchChangeStateEventBeforeMiddleware;
  }
};
export const setDefaultBackHandlerOptions = () => {
  window.blumRouter = {
    isBackFromBrowser: true,
    beforeBackHandledCallback: null,
    afterBackHandledCallback: null,
    isDispatchChangeStateEventBeforeMiddleware: false,
    isDispatchChangeStateEventAfterMiddleware: true,
  };
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

type BackHandlerOptions = {
  beforeBackHandledCallback?: (() => void) | null;
  afterBackHandledCallback?: (() => void) | null;
  isDispatchChangeStateEventBeforeMiddleware?: boolean;
  isDispatchChangeStateEventAfterMiddleware?: boolean;
};
