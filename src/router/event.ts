import { createEvent } from "effector";
import { SetRoutes } from "src/types";

export const setActiveView = createEvent<string>();
export const setActivePanel = createEvent<string>();
export const setActiveModal = createEvent<string>();
export const setActivePopout = createEvent<string>();
export const _setActiveModal = createEvent<string | null>();
export const _setActivePopout = createEvent<string | null>();
export const setRoutes = createEvent<SetRoutes>();
export const initRoute = createEvent();
