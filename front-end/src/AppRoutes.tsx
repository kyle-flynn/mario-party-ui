import { ReactNode } from "react";
import { AdminPanel } from "./screens/Admin/AdminPanel";
import { StreamDisplay } from "./screens/Stream/StreamDisplay";

export interface AppRoute {
  name: string;
  path: string;
  component: ReactNode;
}

export const AppRoutes: AppRoute[] = [
  {
    name: "Stream Display",
    path: "/",
    component: <StreamDisplay />,
  },
  {
    name: "Admin Panel",
    path: "/admin",
    component: <AdminPanel />,
  },
];
