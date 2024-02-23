import { FaLongArrowAltLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
const ReturnToMenu = () => {
   
    return ( <Link
        to="/"
        className="absolute bottom-12 right-12 h-16 w-16 rounded-2xl p-5 sm:w-28
         text-stone-950 flex items-center justify-center shadow-3xl bg-stone-100 cursor-pointer">
        <FaLongArrowAltLeft />
        <span className="ms-2">Menu</span>
      </Link> );
}
 
export default ReturnToMenu;