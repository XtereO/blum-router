import { createEvent } from "effector";

export const _setActiveView = createEvent<string>();
export const _setActivePanel = createEvent<string>();
export const _setActiveViewPanel = createEvent<{
  view: string;
  panel: string;
}>();
export const _setActiveModal = createEvent<string | null>();
export const _setActivePopout = createEvent<string | null>();
export const initRoute = createEvent();
export const setBackHandled = createEvent<boolean>();
