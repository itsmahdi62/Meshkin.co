import { Link } from "react-router-dom";
import Username from "../features/user/Username";
import CartOverview from "../features/cart/CartOverview";

const Header = () => {
  // const username = useSelector((state) => state.auth.user);
  const username = sessionStorage.getItem("username");

  return (
    <header className="flex items-center  justify-end  bg-blue-600 shadow-lg uppercase font-semibold px-4 py-3 border-b border-stone-200 sm:px-16">
      <Link
        className="tracking-widest text-stone-100 me-auto hover:tracking-[.25rem] transition-all duration-500"
        to="/">
        Meshkin Co.
      </Link>
      <Username />
      <CartOverview />
      {!username && (
        <div className="flex me-5">
          <Link to="/login">
            <div className="hidden text-sm font-semibold text-stone-500 px-4 py-3 me-5 bg-stone-200 rounded-xl md:block hover:shadow-2xl hover:px-6 transition-all duration-500  ">
              Login
            </div>
          </Link>
          <Link to="/signUp">
            <div className="hidden text-sm font-semibold text-stone-500 px-4 py-3  bg-stone-200 rounded-xl md:block hover:shadow-2xl hover:px-6 transition-all duration-500  ">
              Sign Up
            </div>
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
