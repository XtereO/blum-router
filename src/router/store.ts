import { createStore } from "effector";
import {
  initRoute,
  setActiveModal,
  setActivePanel,
  setActivePopout,
  setActiveView,
  setRoutes,
  _setActiveModal,
  _setActivePopout
} from "./event";

type Store = {
  activeView: string | null;
  activePanel: string | null;
  activeModal: string | null;
  activePopout: string | null;
  isRouteInit: boolean;
};

export const $router = createStore<Store>({
  activeView: null,
  activePanel: null,
  activeModal: null,
  activePopout: null,
  isRouteInit: false,
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
  }))
  .on(initRoute, (state) => ({
    ...state,
    isRouteInit: true,
  }))
  //@ts-ignore
  .on(setRoutes, (state, routes) => ({
    ...state,
    activeView: routes.hasOwnProperty("view") ? routes.view : state.activeView,
    activePanel: routes.hasOwnProperty("panel") ? routes.panel : state.activePanel,
    activeModal: routes.hasOwnProperty("modal") ? routes.modal : state.activeModal,
    activePopout: routes.hasOwnProperty("popout") ? routes.popout : state.activePopout,
  }));
