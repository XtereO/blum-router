import { createEvent } from "effector";
import { SetRoutes } from "src/types";

export const _setActiveView = createEvent<string>();
export const _setActivePanel = createEvent<string>();
export const _setActiveModal = createEvent<string | null>();
export const _setActivePopout = createEvent<string | null>();
export const setRoutes = createEvent<SetRoutes>();
export const initRoute = createEvent();
export const setBackHandled = createEvent<boolean>();
