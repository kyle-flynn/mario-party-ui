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
    name: "Stream Display 1",
    path: "/",
    component: <StreamDisplay />,
  },
  {
    name: "Stream Display 2",
    path: "/display/:id",
    component: <StreamDisplay />,
  },
  {
    name: "Admin Panel",
    path: "/admin",
    component: <AdminPanel />,
  },
];
