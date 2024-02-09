import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalCartQuantity } from "./cartSlice";
import { IoCartOutline } from "react-icons/io5";

function CartOverview() {
  const totalCartQuantity = useSelector(getTotalCartQuantity);
  const username = useSelector((state) => state.user.username);
  if(!username) return null

  return (
    
    <div className="flex items-center  me-5 bg-stone-100 text-sm text-stone-200 uppercase px-1 py-2 rounded-md sm:px-6">
      <IoCartOutline className="text-stone-500 me-4" />
      <p className="text-stone-300 font-semibold space-x-4 sm:space-x-6 md:text-base">
        <Link to="/cart">{totalCartQuantity}</Link>
      </p>
    </div>
  );
}

export default CartOverview;
