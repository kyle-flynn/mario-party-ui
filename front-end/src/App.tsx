import { FC } from "react";
import { Routes, Route } from "react-router-dom";
import { AppRoutes } from "./AppRoutes";
import { UpdateListener } from "./components/UpdateListener";
import { useRecoilValue } from "recoil";
import { isProductionSelector } from "./stores/Recoil";
import "./App.less";

const App: FC = () => {
  const isProduction = useRecoilValue(isProductionSelector);

  return (
    <>
      <UpdateListener
        host={window.location.hostname}
        port={isProduction ? "80" : "8080"}
      />
      <Routes>
        {AppRoutes.map((route) => (
          <Route key={route.name} path={route.path} element={route.component} />
        ))}
      </Routes>
    </>
  );
};

export default App;
