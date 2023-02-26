import { Routes } from "./types";

export const blumRouter = {
  subscribers: [] as Subscriber[],
  changeState(routes: BlumRouterEventKey["changestate"]) {
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
  addEventListener(
    type: keyof BlumRouterEventKey,
    callback: Subscriber["callback"],
    index: number
  ) {
    this.subscribers.push({ type, callback, index });
  },
  removeEventListener(index: number) {
    this.subscribers = this.subscribers.filter((s) => s.index !== index);
  },
  _trigerEvent<K extends keyof BlumRouterEventKey>(
    type: K,
    payload: BlumRouterEventKey[K]
  ) {
    this.subscribers.forEach((s) => s.type === type && s.callback(payload));
  },
};

export type BlumRouterEventKey = {
  changestate: Routes | null;
};
export type Subscriber = {
  type: keyof BlumRouterEventKey;
  callback: (payload: BlumRouterEventKey[keyof BlumRouterEventKey]) => void;
  index: number;
};
