import { createBrowserRouter } from "react-router";
import MainLayout from "../layoout/MainLayout";
import Home from "../pages/Home";
import DesignPage from "../pages/DesignPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/design-tshirt",
        element: <DesignPage />,
      },
    ],
  },
]);

export default router;
