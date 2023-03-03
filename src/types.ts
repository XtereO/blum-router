export type InitRouteOptions = {
  view: string;
  panel: string;
  modal?: string | null;
  popout?: string | null;
};

export type Routes = {
  view: string | null;
  panel: string | null;
  modal: string | null;
  popout: string | null;
};

export type SetRoutes = {
  view?: string;
  panel?: string;
  modal?: string;
  popout?: string;
};

export type RouteMiddleware = (
  storeRoutes: Routes,
  prevRoutes: Routes,
  options: BackHandlerOptions
) => boolean | Promise<boolean>;

export type BackHandlerOptions = {
  beforeBackHandledCallback?: (() => void) | null;
  afterBackHandledCallback?: (() => void) | null;
  isDispatchChangeStateEventBeforeMiddleware?: boolean;
  isDispatchChangeStateEventAfterMiddleware?: boolean;
  isBackFromBrowser?: boolean;
  isBackHandled?: boolean;
};
