import Header from "./Header";
import CartOverView from "../features/cart/CartOverview";
import { Outlet, useNavigation } from "react-router-dom";
import Loader from "./Loader";
const AppLayout = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  return (
    <div className="grid  grid-rows-[auto_1fr_auto] h-screen bg-stone-100">
      {isLoading && <Loader />}

      <Header />
      <div className="overflow-scroll mt-8">
        <main className="max-w-5xl  mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
