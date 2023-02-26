import { createStore } from "effector";
import {
  initRoute,
  setBackHandled,
  _setActiveModal,
  _setActivePanel,
  _setActivePopout,
  _setActiveView,
  _setActiveViewPanel,
} from "./event";

type Store = {
  activeView: string | null;
  activePanel: string | null;
  activeModal: string | null;
  activePopout: string | null;
  isRouteInit: boolean;
  isBackHandled: boolean;
};

export const $router = createStore<Store>({
  activeView: null,
  activePanel: null,
  activeModal: null,
  activePopout: null,
  isRouteInit: false,
  isBackHandled: true,
})
  .on(_setActiveView, (state, activeView) => ({
    ...state,
    activeView,
  }))
  .on(_setActivePanel, (state, activePanel) => ({
    ...state,
    activePanel,
  }))
  .on(_setActiveModal, (state, activeModal) => ({
    ...state,
    activeModal,
  }))
  .on(_setActivePopout, (state, activePopout) => ({
    ...state,
    activePopout,
  }))
  .on(initRoute, (state) => ({
    ...state,
    isRouteInit: true,
  }))
  .on(_setActiveViewPanel, (state, { view, panel }) => ({
    ...state,
    activeView: view,
    activePanel: panel,
  }))
  .on(setBackHandled, (state, isBackHandled) => ({
    ...state,
    isBackHandled,
  }));
