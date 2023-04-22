import { Routes } from "./types";

export const blumRouter = {
  subscribers: [] as Subscriber[],
  historyPush(routes: Partial<Routes>) {
    const { view, panel, modal, popout } = window.history.state ?? {
      view: undefined,
      panel: undefined,
      modal: undefined,
      popout: undefined,
    };
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
