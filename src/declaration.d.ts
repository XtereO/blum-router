interface Window {
  blumRouter: {
    beforeBackHandledCallback: (() => void) | null;
    afterBackHandledCallback: (() => void) | null;
    isDispatchChangeStateEventBeforeMiddleware: boolean;
    isDispatchChangeStateEventAfterMiddleware: boolean;
    isBackFromBrowser: boolean;
  };
}
window.blumRouter = {
  isBackFromBrowser: true,
  beforeBackHandledCallback: null,
  afterBackHandledCallback: null,
  isDispatchChangeStateEventBeforeMiddleware: false,
  isDispatchChangeStateEventAfterMiddleware: true,
};
