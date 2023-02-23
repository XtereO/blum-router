import { createEffect } from "effector";
import { Routes } from "src/types";

export const back = createEffect(() => {
  window.isBackFromBrowser = false;
  window.history.back();
});
export const historyPush = createEffect<Routes, void>((routes) => {
  window.history.pushState(routes, "");
});
