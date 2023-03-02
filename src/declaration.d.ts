interface Window {
  blumRouter: {
    beforeBackHandledCallback: () => void | null;
    afterBackHandledCallback: () => void | null;
    isDispatchChangeStateEventBeforeMiddleware: boolean;
    isDispatchChangeStateEventAfterMiddleware: boolean;
    isBackFromBrowser: boolean;
  };
}
window.blumRouter.isBackFromBrowser = true;
window.blumRouter.beforeBackHandledCallback = null;
window.blumRouter.afterBackHandledCallback = null;
window.blumRouter.isDispatchChangeStateEventBeforeMiddleware = false;
window.blumRouter.isDispatchChangeStateEventAfterMiddleware = true;
