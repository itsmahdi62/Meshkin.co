import Header from "../utils/Header";
import CartOverView from "../features/cart/CartOverview"
import { Outlet } from "react-router-dom";
const AppLayout = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>

      <CartOverView />
    </div>
  );
};

export default AppLayout;
