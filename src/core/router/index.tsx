import { Suspense } from "react";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { RoutesPathEnum } from "./types";

import Home from "@modules/home";
import Client from "@modules/client";
// Com o lazy, da uma warning no MSW
// const Home = lazy(() => import("@modules/home"));
// const Client = lazy(() => import("@modules/client"));

const router = createBrowserRouter([
  {
    path: RoutesPathEnum.Home,
    element: (
      <Suspense fallback={<>Spinner...</>}>
        <Home />
      </Suspense>
    ),
  },
  {
    path: `${RoutesPathEnum.Cliente}/:cpf?`,
    element: (
      <Suspense fallback={<>Spinner...</>}>
        <Client />
      </Suspense>
    ),
  },
  {
    path: "*",
    element: <div>rota não encontrada!</div>,
  },
]);

const Router = () => {
  return <RouterProvider router={router} fallbackElement={<>Spinner...</>} />;
};

export default Router;
