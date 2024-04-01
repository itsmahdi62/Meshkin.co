/* eslint-disable no-unused-vars */
import "./App.css";
import Cart from "./features/cart/Cart";
import CreateOrder from "./features/order/CreateOrder";
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
import Orders from "./admin-section/features/Orders/Orders";
import ResetPasswordPage from "./features/auth/ResetPasswordPage";
import UserProductsList from "./features/user/UserProductsList";
import MyProducts from "./features/user/MyProducts";
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
        path: "/resetPassword",
        element: <ResetPasswordPage />,
        errorElement: <Error />,
      },
      {
        path: "orders",
        element: <Orders />,
        // loader: loginLoader,
        errorElement: <Error />,
      },
      {
        path: "/order/new",
        element: <CreateOrder />,
      },
      {
        path: "/order/:orderId",
        element: <Order />,
        loader: orderLoader,
        errorElement: <Error />,
      },
      {
        path: "/userProducts",
        element: <UserProductsList />,
        errorElement: <Error />,
      },
      {
        path: "/userProducts/:id",
        element: <MyProducts />,
        // loader: productLoader,
        errorElement: <Error />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
