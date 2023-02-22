import { createEffect } from 'effector';

export const back = createEffect(() => {
  window.isBackFromBrowser = false;
  window.history.back();
});
