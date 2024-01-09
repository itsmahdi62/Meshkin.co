import Header from "../utils/Header";
import CartOverView from "../features/cart/CartOverview"
import { Outlet, useNavigation } from "react-router-dom";
import Loader from "./Loader";
const AppLayout = () => {
  const navigation = useNavigation()
  const isLoading =  navigation.state === "loading"
  return (
    <div className="layout">
      {isLoading && <Loader />}


      <Header />
      <main>
        <Outlet />
      </main>

      <CartOverView />
    </div>
  );
};

export default AppLayout;
