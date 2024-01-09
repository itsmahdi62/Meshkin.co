/* eslint-disable no-unused-vars */
import "./App.css";
import Home from "./ui/Home";
import Cart from "./features/cart/Cart";
import Menu, { loader as menuLoader } from "./features/Menu/Menu";
import CreateOrder from "./features/order/CreateOrder";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Order from "./features/order/Order";
import AppLayout from "./ui/AppLayout";
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
        loader: menuLoader,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "/order/new",
        element: <CreateOrder />,
      },
      {
        path: "/order/:order",
        element: <Order />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
