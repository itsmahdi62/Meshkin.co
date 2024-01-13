import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import Username from "../features/user/Username";

const Header = () => {
  return (
    <header className="bg-yellow-500 uppercase font-semibold">
      <Link className="tracking-widest" to="/">
        Fast react Co.
      </Link>
      <SearchOrder />
      <Username />
    </header>
  );
};

export default Header;
