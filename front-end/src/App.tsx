import { FC } from "react";
import { Routes, Route } from "react-router-dom";
import { AppRoutes } from "./AppRoutes";
import { UpdateListener } from "./components/UpdateListener";
import "./App.less";

const App: FC = () => {
  return (
    <>
      <UpdateListener host="127.0.0.1" port="8080" />
      <Routes>
        {AppRoutes.map((route) => (
          <Route key={route.name} path={route.path} element={route.component} />
        ))}
      </Routes>
    </>
  );
};

export default App;
