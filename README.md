<div align="center">
    <img width="134" src="https://webstockreview.net/images/comet-clipart-meteorite-4.png">
</div>

# Not tested! Will arround March 15.

# Description

This library based on [effector](https://www.npmjs.com/package/effector) and window.history.state without changing url and hash. Created for routing vk-mini-apps, also may useful in PWA. I recomend use it with @blumjs/cli.

## Usage

### Initialization

To Route handle prev button in browser, you should init first:

```
import { useInitRouter } from '@blumjs/router';

const App = () => {
  useInitRouter({
    view: "Main",
    panel: "Home",
    modal: null,
    popout: null
  });

  ...
}
```

To handle prev button you can use middlewares:

```
import {
  useInitRouter,
  createCatchBackBrowserRouteMiddleware,
  createDisableBackBrowserRouteMiddleware,
  createRouteMiddleware,
  blumRouter
} from '@blumjs/router';

const App = () => {
  useInitRouter({
      view: "Main",
      panel: "Home",
      modal: null,
      popout: null
    },
    //first arg is the name of route; second callback, that fired when pushed back in browser
    createCatchBackBrowserRouteMiddleware('Alert', (storeRoutes, prevRoutes) => back());
    //the same as createCatchBackBrowserRouteMiddleware, but make auto historyPush storeRoutes
    createDisableBackBrowserRouteMiddleware('Loading', (storeRoutes, prevRoutes) => console.log('loading, please wait...')),
    //custom middleware
    createRouteMiddleware((storeRoutes, prevRoutes) => {
      if(navigator.onLine){
        //middleware passed
        return true;
      }
      blumRouter.historyPush({view: 'ConnectionError', panel: 'Offline', modal: null, popout: null});
      return false;
    })
  );

  ...
}
```

### Routes: get

To get routes and check initialization routes:

```
import { useRouter } from '@blumjs/router';

const App = () => {
  const { activeView, activePanel, activeModal, activePopout, isRouteInit } = useRouter();

  ...
}
```

### Routes: set

To set routes you can use functions: setRoutes(set all routes), setActiveView, setActivePanel, setActiveModal, setActivePopout.

```
import { setActiveViewPanel, setActivePanel, setActiveModal, setActivePopout } from '@blumjs/router';

setActiveViewPanel({view: 'Main', panel: 'Home'});
setActivePanel('Home');
setActiveModal('Notifications');
setActivePopout('Loading');
```

To get previous page use back:

```
import { back } from '@blumjs/router';

//if you want to, that state changed only before middlewares:
back({
  isDispatchChangeStateEventBeforeMiddleware: true,
  isDispatchChangeStateEventAfterMiddleware: false
});

//back is async function and you can't await it. So use options beforeBackHandledCallback (triggered after window.history.back and before middlewares) and afterBackHandledCallback (triggered when passed all midlewares)
back({
  beforeBackHandledCallback: () => {
    console.log("I triggered before middlewares")
  },
  afterBackHandledCallback: () => {
    console.log("I triggered after middlewares")
  }
});

//default: isDispatchChangeStateEventBeforeMiddleware = false, isDispatchChangeStateEventAfterMiddleware = true, and callbacks are null
back();

```

If you need turn off modal and popout in new page (for example, offline page, where user shouldn't see modal and popout) you can use \_setActiveModal, \_setActivePopout. In other case use back.

```
import { _setActiveModal, _setActivePopout } from '@blumjs/router';

_setActiveModal(null);
_setActivePopout(null);
```
