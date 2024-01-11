import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";

const Header = () => {
    return ( <header>
        <Link to="/">Fast react Co.</Link>
        <SearchOrder />
        <p>ddd</p>
    </header> );
}
 
export default Header;