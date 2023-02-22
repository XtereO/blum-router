import { createStore } from "effector";
import {
  setActiveModal,
  setActivePanel,
  setActivePopout,
  setActiveView,
  _setActiveModal,
  _setActivePopout,
} from "./event";

type Store = {
  activeView: string | null;
  activePanel: string | null;
  activeModal: string | null;
  activePopout: string | null;
};

export const $router = createStore<Store>({
  activeView: null,
  activePanel: null,
  activeModal: null,
  activePopout: null,
})
  .on(setActiveView, (state, activeView) => ({
    ...state,
    activeView,
  }))
  .on(setActivePanel, (state, activePanel) => ({
    ...state,
    activePanel,
  }))
  .on(setActiveModal, (state, activeModal) => ({
    ...state,
    activeModal,
  }))
  .on(_setActiveModal, (state, activeModal) => ({
    ...state,
    activeModal,
  }))
  .on(setActivePopout, (state, activePopout) => ({
    ...state,
    activePopout,
  }))
  .on(_setActivePopout, (state, activePopout) => ({
    ...state,
    activePopout,
  }));
