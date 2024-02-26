/* eslint-disable no-unused-vars */
import "./App.css";
import Home from "./ui/Home";
import Cart from "./features/cart/Cart";
import Menu, { loader, loader as menuLoader } from "./features/Menu/Menu";
import CreateOrder, {
  action as createOrderAction,
} from "./features/order/CreateOrder";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Order, { loader as orderLoader } from "./features/order/Order";
import AppLayout from "./ui/AppLayout";
import Error from "./ui/Error";
import Login from "./features/auth/Login";
import SignupPage from "./features/auth/SignupPage";
import ProductsList, {
  loader as listLoader,
} from "./features/productsList/ProductsList";
import ProductDetails from "./features/productsList/ProductDetails";
import Users from "./admin-section/features/users/Users";
import ProductsTable from "./admin-section/features/productsTable/ProductsTable";
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <ProductsList />,
        loader: listLoader,
        errorElement: <Error />,
      },
      {
        path: "/users",
        element: <Users />,
        errorElement: <Error />,
      },
      {
        path: "/productsTable",
        element: <ProductsTable />,
        errorElement: <Error />,
      },
      {
        path: "/menu",
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />,
      },
      {
        path: "/list",
        element: <ProductsList />,
        loader: listLoader,
        errorElement: <Error />,
      },
      {
        path: "/list/:id",
        element: <ProductDetails />,
        // loader: productLoader,
        errorElement: <Error />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "login",
        element: <Login />,
        // loader: loginLoader,
        errorElement: <Error />,
      },
      {
        path: "signUp",
        element: <SignupPage />,
        // loader: loginLoader,
        errorElement: <Error />,
      },
      {
        path: "/order/new",
        element: <CreateOrder />,
        action: createOrderAction,
      },
      {
        path: "/order/:orderId",
        element: <Order />,
        loader: orderLoader,
        errorElement: <Error />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
