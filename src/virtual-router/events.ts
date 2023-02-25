import { createEvent } from "effector";

export const setActiveView = createEvent<string>();
export const setActivePanel = createEvent<string>();
export const setActiveModal = createEvent<string>();
export const setActivePopout = createEvent<string>();
