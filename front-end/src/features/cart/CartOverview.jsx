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
      className="py-8 my-20  text-sm text-stone-900 border border-stone-400 md:hover:bg-stone-100  md:me-5 md:text-stone-500  md:bg-stone-200 md:text-sm md:py-[10px] md:my-4  md:rounded-2xl md:px-6 md:border-none">
      <Link to="/cart" className="flex items-center justify-center">
        <IoCartOutline className="text-stone-700 me-4" />
        <p className="text-stone-500 font-semibold space-x-4 md:space-x-6 md:text-base">
          {totalCartQuantity}
        </p>
      </Link>
    </div>
  );
}

export default CartOverview;
