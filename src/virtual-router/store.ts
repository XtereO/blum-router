import { createStore } from "effector";
import {
  setActiveModal,
  setActivePanel,
  setActivePopout,
  setActiveView,
} from "./events";

type Store = {
  virtualView: string | null;
  virtualPanel: string | null;
  virtualModal: string | null;
  virtualPopout: string | null;
};

export const $virtualRouter = createStore<Store>({
  virtualView: null,
  virtualPanel: null,
  virtualModal: null,
  virtualPopout: null,
})
  .on(setActiveView, (state, virtualView) => ({
    ...state,
    virtualView,
  }))
  .on(setActivePanel, (state, virtualPanel) => ({
    ...state,
    virtualPanel,
  }))
  .on(setActiveModal, (state, virtualModal) => ({
    ...state,
    virtualModal,
  }))
  .on(setActivePopout, (state, virtualPopout) => ({
    ...state,
    virtualPopout,
  }));
