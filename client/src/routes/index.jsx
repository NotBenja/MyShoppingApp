import { lazy } from "react";

const Home = lazy(() => import("pages/Home"));
const Ventas = lazy(() => import("pages/Ventas"));
const Inventario = lazy(() => import("pages/Inventario"));


const mainRoutes = [
  {
    path: "/",
    title: "Home",
    component: Home,
  },
  {
    path: "/ventas",
    title: "Ventas",
    component: Ventas,
  },
  {
    path: "/inventario",
    title: "Inventario",
    component: Inventario,
  },
];

export { mainRoutes as routes };

