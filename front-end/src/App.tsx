import { FC } from "react";
import { Routes, Route } from "react-router-dom";
import { AppRoutes } from "./AppRoutes";
import "./App.less";

const App: FC = () => {
  return (
    <>
      <Routes>
        {AppRoutes.map((route) => (
          <Route key={route.name} path={route.path} element={route.component} />
        ))}
      </Routes>
    </>
  );
};

export default App;
