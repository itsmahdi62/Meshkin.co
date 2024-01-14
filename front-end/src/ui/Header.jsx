import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import Username from "../features/user/Username";

const Header = () => {
  return (
    <header className="flex items-center  justify-between bg-yellow-500 uppercase font-semibold px-4 py-3 border-b border-stone-200 sm:px-6">
      <Link className="tracking-widest" to="/">
        Fast react Co.
      </Link>
      <SearchOrder />
      <Username />
    </header>
  );
};

export default Header;
