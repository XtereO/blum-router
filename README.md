<div align="center">
    <img width="134" src="https://webstockreview.net/images/comet-clipart-meteorite-4.png">
</div>

# Not stable!

# Description

This library based on [effector](https://www.npmjs.com/package/effector) and window.history.state without changing url and hash. Created for routing vk-mini-apps. I recomend use it with @blumjs/cli.

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
import { useInitRouter, createDisableBackBrowserRouteMiddleware, createRouteMiddleware, historyPush } from '@blumjs/router';

const App = () => {
  useInitRouter({
      view: "Main",
      panel: "Home",
      modal: null,
      popout: null
    },
  //first arg is the name of route; second callback, that fired when pushed back in browser
    createDisableBackBrowserRouteMiddleware('Loading', (storeRoutes, prevRoutes) => console.log('loading, please wait...')),
    createRouteMiddleware((storeRoutes, prevRoutes) => {
      if(navigator.onLine){
        //middleware passed
        return true;
      }
      historyPush({view: 'ConnectionError', panel: 'Offline', modal: null, popout: null});
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
import { setRoutes, setActiveView, setActivePanel, setActiveModal, setActivePopout } from '@blumjs/router';

//setRoutes accept partial routes
setRoutes({view: 'Main', panel: 'Home'});
setRoutes({modal: 'Onboarding'});
setRoutes({panel: 'Game', popout: 'Loading'});

setActiveView('Main');
setActivePanel('Home');
setActiveModal('Notifications');
setActivePopout('Loading');
```

To get previous page use back:

```
import { back } from '@blumjs/router';

back();
```

If you need turn off modal and popout in new page (for example, offline page, where user shouldn't see modal and popout) you can use \_setActiveModal, \_setActivePopout. In other case use back.

```
import { _setActiveModal, _setActivePopout } from '@blumjs/router';

_setActiveModal(null);
_setActivePopout(null);
```
