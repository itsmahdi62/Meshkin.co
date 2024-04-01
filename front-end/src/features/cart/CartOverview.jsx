import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalCartQuantity } from "./cartSlice";
import { IoCartOutline } from "react-icons/io5";

function CartOverview(props) {
  const totalCartQuantity = useSelector(getTotalCartQuantity);
  // const username = useSelector((state) => state.user.username);
  // const username = sessionStorage.getItem("username");

  return (
    <div
      onClick={() => props.setShowMenu(false)}
      className="py-8 my-20  text-sm text-stone-900 border  border-stone-600 hover:bg-stone-100 sm:px-4 sm:py-2 sm:border-none">
      <Link to="/cart" className="flex items-center justify-center">
        <IoCartOutline className="text-stone-700 me-4" />
        <p className="text-stone-500 font-semibold space-x-4 sm:space-x-6 md:text-base">
          {totalCartQuantity}
        </p>
      </Link>
    </div>
  );
}

export default CartOverview;
