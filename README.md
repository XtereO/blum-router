<div align="center">
    <img src="https://drive.google.com/uc?export=view&id=14_MxI0TSoz8wK9e-f8BHzworUfehaZz3"/>
</div>

# Описание

Библиотека основана на [effector](https://www.npmjs.com/package/effector) и window.history.state без изменения url и hash. Создана для роутинга vk-mini-apps, также поддерживает PWA. Рекомендуется использовать с [@blumjs/cli](https://www.npmjs.com/package/@blumjs/cli).

## Использование

### Инициализация

Чтобы обработать браузерную кнопку назад, нужно проинициализровать роутер:

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

Чтобы поймать кнопку назад, используйте middlewares:

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
    //первый аргумент - название роута; второй callback, который вызовется при срабатывании браузерной кнопки назад
    createCatchBackBrowserRouteMiddleware('Alert', (storeRoutes, prevRoutes) => back());

    //такая же как createCatchBackBrowserRouteMiddleware, но автоматически предотвращает изменение роутеров
    createDisableBackBrowserRouteMiddleware('Loading', (storeRoutes, prevRoutes) => console.log('loading, please wait...')),

    //кастомный middleware
    createRouteMiddleware((storeRoutes, prevRoutes) => {
      if(navigator.onLine){

        //middleware пройден
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

Чтобы получить роутеры и проверить инициализацию:

```
import { useRouter } from '@blumjs/router';

const App = () => {
  const { activeView, activePanel, activeModal, activePopout, isRouteInit } = useRouter();

  ...
}
```

### Routes: set

Чтобы поставить роутер, используйте функции: setActiveView, setActivePanel, setActiveModal, setActivePopout.

```
import { setActiveViewPanel, setActivePanel, setActiveModal, setActivePopout } from '@blumjs/router';

setActiveViewPanel({view: 'Main', panel: 'Home'});
setActivePanel('Home');
setActiveModal('Notifications');
setActivePopout('Loading');
```

Чтобы вернуться на предыдущую страницу:

```
import { back } from '@blumjs/router';

//если вы хотите, чтобы роутеры менялись до прогонки middlewares:
back({
  isDispatchChangeStateEventBeforeMiddleware: true,
  isDispatchChangeStateEventAfterMiddleware: false
});

//back - асинхронная функция и ее нельзя дождаться с помощью await и then. Используйте опции beforeBackHandledCallback (срабатывает после window.history.back и перед middlewares) и afterBackHandledCallback (срабатывает при успешном или провальном обходе middlewares)
back({
  beforeBackHandledCallback: (storeRoutes, prevRoutes) => {
    console.log("I triggered before middlewares")
  },
  afterBackHandledCallback: (storeRoutes, prevRoutes) => {
    console.log("I triggered after middlewares")
  }
});

//значения по умолчанию: isDispatchChangeStateEventBeforeMiddleware = false, isDispatchChangeStateEventAfterMiddleware = true, и callbacks = null
back();

```

Если вам нужно выключить модалку или popout на новой странице (например, offline страница, где пользователь не должен видеть модалку и popout) вы можете использовать \_setActiveModal, \_setActivePopout. В других случаях лучше использовать функцию back.

```
import { _setActiveModal, _setActivePopout } from '@blumjs/router';

_setActiveModal(null);
_setActivePopout(null);
```
