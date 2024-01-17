import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalCartPrice, getTotalCartQuantity } from "./cartSlice";

function CartOverview() {
  const totalCartQuantity = useSelector(getTotalCartQuantity);
  const totalCartPrice = useSelector(getTotalCartPrice);
  if (!totalCartQuantity) return null;

  return (
    <div className="flex items-center justify-between bg-stone-800 text-sm text-stone-200 uppercase px-4 py-4 sm:px-6">
      <p className="text-stone-300 font-semibold space-x-4 sm:space-x-6 md:text-base">
        <span>{totalCartQuantity}</span>
        <span>{totalCartPrice}$</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
