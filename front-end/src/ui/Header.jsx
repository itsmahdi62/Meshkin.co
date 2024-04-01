import { Link } from "react-router-dom";
import Username from "../features/user/Username";
import CartOverview from "../features/cart/CartOverview";
import UserProducts from "../features/user/UserProducts";
import { useState } from "react";
const Header = () => {
  // const username = useSelector((state) => state.auth.user);
  const username = sessionStorage.getItem("username");

  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className="flex items-center justify-end bg-blue-600 shadow-lg uppercase font-semibold px-4 py-3 border-b border-stone-200 sm:px-16 relative">
      <Link
        className="tracking-widest text-stone-100 me-auto hover:tracking-[.25rem] transition-all duration-500"
        to="/">
        Meshkin Co.
      </Link>
      <Username />

      {!username && (
        <div className="flex me-5">
          <Link to="/login">
            <div className="hidden text-sm font-semibold text-stone-500  bg-stone-200 px-4 py-3 me-5  rounded-xl md:block hover:shadow-2xl hover:px-6 transition-all duration-500  ">
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
      <button
        className="text-stone-100 focus:outline-none md:hidden"
        onClick={() => setShowMenu(!showMenu)}>
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
      {showMenu && (
        <div className="absolute top-16 right-0 w-full min-h-dvh text-center bg-stone-50 shadow-lg py-2 rounded-md z-20">
          <UserProducts setShowMenu={setShowMenu} />
          <CartOverview setShowMenu={setShowMenu} />
          <Link
            onClick={() => setShowMenu(false)}
            className="block py-8 my-20 text-sm text-stone-900 border border-stone-600 hover:bg-stone-100 sm:px-4 sm:py-2 sm:border-none"
            to="/login">
            Login
          </Link>
          <Link
            onClick={() => setShowMenu(false)}
            className="block py-8 my-20 text-sm text-stone-900 border border-stone-600 hover:bg-stone-100 sm:px-4 sm:py-2 sm:border-none"
            to="/signUp">
            Sign Up
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
