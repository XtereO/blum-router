import { useEffect } from "react";
import { blumRouter, BlumRouterEventMap } from "./blum-router";

export const useEventListener = <K extends keyof WindowEventMap>(
  eventListen: K,
  callback: (e: WindowEventMap[K]) => void,
  eventKey?: string
) => {
  useEffect(() => {
    const eventHandler = (event: WindowEventMap[K]) => {
      if (event instanceof KeyboardEvent && event.key === eventKey) {
        callback(event);
      } else if (!eventKey) {
        callback(event);
      }
    };

    window.addEventListener(eventListen, eventHandler);
    return () => window.removeEventListener(eventListen, eventHandler);
  }, [eventListen, eventKey, callback]);
};

export const useBlumEventListener = <K extends keyof BlumRouterEventMap>(
  eventListen: K,
  callback: (payload: BlumRouterEventMap[K]) => void,
  index: number
) => {
  useEffect(() => {
    blumRouter.addEventListener(eventListen, callback, index);
    return () => blumRouter.removeEventListener(index);
  }, [eventListen, index, callback]);
};
