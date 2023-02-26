import { Routes } from "./types";

export const blumRouter = {
  subscribers: [] as Subscriber[],
  changeState(routes: BlumRouterEventMap["changestate"]) {
    try {
      window.history.pushState(routes, "");
      this.fireChangeStateEvent();
    } catch (e) {
      console.log("changeState err", e);
    }
  },
  fireChangeStateEvent() {
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
