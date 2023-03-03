import { createStore } from "effector";
import {
  initRoute,
  setBackHandled,
  setBackHandlerOptions,
  setDefaultBackHandlerOptions,
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
  isDispatchChangeStateEventBeforeMiddleware: boolean;
  isDispatchChangeStateEventAfterMiddleware: boolean;
  beforeBackHandledCallback: (() => void) | null;
  isBackFromBrowser: boolean;
  afterBackHandledCallback: (() => void) | null;
};

export const $router = createStore<Store>({
  activeView: null,
  activePanel: null,
  activeModal: null,
  activePopout: null,
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
