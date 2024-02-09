import { Link } from "react-router-dom";
import Username from "../features/user/Username";
import CartOverview from "../features/cart/CartOverview";
const Header = () => {
  return (
    <header className="flex items-center  justify-end  bg-blue-600 shadow-lg uppercase font-semibold px-4 py-3 border-b border-stone-200 sm:px-6">
      <Link className="tracking-widest me-auto" to="/">
        Meshkin Co.
      </Link>
      <CartOverview />
      <Username />
    </header>
  );
};

export default Header;
