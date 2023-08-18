import { createStore } from "effector";
import { Routes, SetRouteOptions } from "src/types";
import {
  _setActiveModal,
  _setActivePanel,
  _setActivePopout,
  _setActiveView,
  _setActiveViewPanel,
  _setRouteOptions,
  initRoute,
  setBackHandled,
  setBackHandlerOptions,
  setDefaultBackHandlerOptions,
} from "./event";

type Store = {
  activeView: string | null;
  activePanel: string | null;
  activeModal: string | null;
  activePopout: string | null;
  isRouteInit: boolean;
  routeOptions: SetRouteOptions | null;
  isBackHandled: boolean;
  isDispatchChangeStateEventBeforeMiddleware: boolean;
  isDispatchChangeStateEventAfterMiddleware: boolean;
  beforeBackHandledCallback:
    | ((storeRoutes: Routes, prevRoutes: Routes) => void)
    | null;
  isBackFromBrowser: boolean;
  afterBackHandledCallback:
    | ((storeRoutes: Routes, prevRoutes: Routes) => void)
    | null;
};

export const $router = createStore<Store>({
  activeView: null,
  activePanel: null,
  activeModal: null,
  activePopout: null,
  routeOptions: null,
  isRouteInit: false,
  isBackHandled: true,
  isDispatchChangeStateEventBeforeMiddleware: false,
  isDispatchChangeStateEventAfterMiddleware: true,
  beforeBackHandledCallback: null,
  afterBackHandledCallback: null,
  isBackFromBrowser: true,
})
  .on(setDefaultBackHandlerOptions, (state) => ({
    ...state,
    isDispatchChangeStateEventBeforeMiddleware: false,
    isDispatchChangeStateEventAfterMiddleware: true,
    beforeBackHandledCallback: null,
    afterBackHandledCallback: null,
    isBackFromBrowser: true,
    isBackHandled: true,
  }))
  .on(setBackHandlerOptions, (state, options) => ({
    ...state,
    isBackHandled: options.hasOwnProperty("isBackHandled")
      ? options.isBackHandled!
      : state.isBackHandled,
    isBackFromBrowser: options.hasOwnProperty("isBackFromBrowser")
      ? options.isBackFromBrowser!
      : state.isBackFromBrowser,
    isDispatchChangeStateEventBeforeMiddleware: options.hasOwnProperty(
      "isDispatchChangeStateEventBeforeMiddleware"
    )
      ? options.isDispatchChangeStateEventBeforeMiddleware!
      : state.isDispatchChangeStateEventBeforeMiddleware,
    isDispatchChangeStateEventAfterMiddleware: options.hasOwnProperty(
      "isDispatchChangeStateEventAfterMiddleware"
    )
      ? options.isDispatchChangeStateEventAfterMiddleware!
      : state.isDispatchChangeStateEventAfterMiddleware,
    beforeBackHandledCallback: options.hasOwnProperty(
      "beforeBackHandledCallback"
    )
      ? options.beforeBackHandledCallback!
      : state.beforeBackHandledCallback,
    afterBackHandledCallback: options.hasOwnProperty("afterBackHandledCallback")
      ? options.afterBackHandledCallback!
      : state.afterBackHandledCallback,
  }))
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
  .on(_setActivePopout, (state, popout) => ({
    ...state,
    activePopout: popout,
  }))
  .on(_setRouteOptions, (state, options) => ({
    ...state,
    routeOptions: options,
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
