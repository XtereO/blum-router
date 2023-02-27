import { useCallback } from "react";
import { createRoot } from "react-dom/client";
import { back, setActiveModal, setActivePanel } from "./router";
import { useInitRouter, useRouter } from "./useRoutes";

const App = () => {
  useInitRouter({
    view: "Main",
    panel: "Menu",
    modal: null,
    popout: null,
  });

  const { activeView, activePanel, activeModal, activePopout, isRouteInit } =
    useRouter();
  const handleNavSingle = useCallback(() => {
    setActivePanel("Single");
  }, []);
  const openModal = useCallback(() => {
    setActiveModal("Onboarding");
  }, []);
  const goBack = useCallback(() => {
    back();
  }, []);

  return (
    <div>
      <div>init status: {isRouteInit ? "yes" : "no"}</div>
      <div>view: {activeView}</div>
      <div>panel: {activePanel}</div>
      <div>modal: {activeModal}</div>
      <div>popout: {activePopout}</div>
      <div>
        <button onClick={handleNavSingle}>To Single</button>
      </div>
      <div>
        <button onClick={openModal}>Open modal</button>
      </div>
      <div>
        <button onClick={goBack}>Go back</button>
      </div>
    </div>
  );
};

const root = createRoot(document.getElementById("app")!);
root.render(<App />);
