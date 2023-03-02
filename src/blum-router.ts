import { Routes } from "./types";

export const blumRouter = {
  isDispatchChangeStateEventBeforeMiddleware: false,
  isDispatchChangeStateEventAfterMiddleware: true,
  beforeBackHandledCallback: null as (() => void) | null,
  isBackFromBrowser: true,
  afterBackHandledCallback: null as (() => void) | null,
  subscribers: [] as Subscriber[],
  setDefaultBackHandlerOptions() {
    this.setBackHandlerOptions({
      isDispatchChangeStateEventAfterMiddleware: true,
      isDispatchChangeStateEventBeforeMiddleware: false,
      beforeBackHandledCallback: null,
      afterBackHandledCallback: null,
      isBackFromBrowser: true,
    });
  },
  setBackHandlerOptions(options: BackHandlerOptions) {
    Object.keys(options).forEach((key: string) => {
      if (options.hasOwnProperty(key)) {
        //@ts-ignore
        blumRouter[key as keyof BackHandlerOptions] =
          options[key as keyof BackHandlerOptions];
      }
    });
    if (options.hasOwnProperty("beforeBackHandledCallback")) {
      blumRouter.beforeBackHandledCallback = options.beforeBackHandledCallback!;
    }
    if (options.hasOwnProperty("afterBackHandledCallback")) {
      blumRouter.afterBackHandledCallback = options.afterBackHandledCallback!;
    }
    if (options.hasOwnProperty("isDispatchChangeStateEventAfterMiddleware")) {
      blumRouter.isDispatchChangeStateEventAfterMiddleware =
        options.isDispatchChangeStateEventAfterMiddleware!;
    }
    if (options.hasOwnProperty("isDispatchChangeStateEventBeforeMiddleware")) {
      blumRouter.isDispatchChangeStateEventBeforeMiddleware =
        options.isDispatchChangeStateEventBeforeMiddleware!;
    }
    if (options.hasOwnProperty("isBackFromBrowser")) {
      blumRouter.isBackFromBrowser = options.isBackFromBrowser!;
    }
  },
  historyPush(routes: Partial<Routes>) {
    const { view, panel, modal, popout } = window.history.state ?? {
      view: undefined,
      panel: undefined,
      modal: undefined,
      popout: undefined,
    };
    console.log("try to push history", this);
    this.changeState({
      view: routes.hasOwnProperty("view") ? routes.view : view,
      panel: routes.hasOwnProperty("panel") ? routes.panel : panel,
      modal: routes.hasOwnProperty("modal") ? routes.modal : modal,
      popout: routes.hasOwnProperty("popout") ? routes.popout : popout,
    });
  },
  changeState(routes: BlumRouterEventMap["changestate"]) {
    try {
      window.history.pushState(routes, "");
      this.dispatchChangeStateEvent();
    } catch (e) {
      console.log("changeState err", e);
    }
  },
  dispatchChangeStateEvent() {
    this._trigerEvent("changestate", window.history.state);
  },
  addEventListener<K extends keyof BlumRouterEventMap>(
    type: K,
    callback: (payload: BlumRouterEventMap[K]) => void,
    index: number
  ) {
    //@ts-ignore
    this.subscribers.push({ type, callback, index });
    if (type === "changestate") {
      this._trigerEvent("init", true);
    }
  },
  removeEventListener(index: number) {
    this.subscribers = this.subscribers.filter((s) => s.index !== index);
  },
  _trigerEvent<K extends keyof BlumRouterEventMap>(
    type: K,
    payload: BlumRouterEventMap[K]
  ) {
    this.subscribers.forEach((s) => s.type === type && s.callback(payload));
  },
};

export type BlumRouterEventMap = {
  changestate: Routes | null;
  init: boolean;
};

export type Subscriber = {
  type: keyof BlumRouterEventMap;
  callback: <K extends keyof BlumRouterEventMap>(
    payload: BlumRouterEventMap[K]
  ) => void;
  index: number;
};

export type BackHandlerOptions = {
  beforeBackHandledCallback?: (() => void) | null;
  afterBackHandledCallback?: (() => void) | null;
  isDispatchChangeStateEventBeforeMiddleware?: boolean;
  isDispatchChangeStateEventAfterMiddleware?: boolean;
  isBackFromBrowser?: boolean;
};
