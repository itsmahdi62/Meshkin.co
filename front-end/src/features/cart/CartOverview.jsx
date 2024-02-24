import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalCartQuantity } from "./cartSlice";
import { IoCartOutline } from "react-icons/io5";

function CartOverview() {
  const totalCartQuantity = useSelector(getTotalCartQuantity);
  // const username = useSelector((state) => state.user.username);
  // const username = sessionStorage.getItem("username");

  return (
    <div className="me-5 text-stone-500  bg-stone-200 text-sm py-[10px]  rounded-2xl sm:px-6">
      <Link to="/cart" className="flex items-center">
        <IoCartOutline className="text-stone-700 me-4" />
        <p className="text-stone-500 font-semibold space-x-4 sm:space-x-6 md:text-base">
          {totalCartQuantity}
        </p>
      </Link>
    </div>
  );
}

export default CartOverview;
