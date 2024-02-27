import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "./cartSlice";
import { clearCart } from "./cartSlice";
import ReturnToMenu from "../../ui/ReturnToMenu";
import { Link } from "react-router-dom";

function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector(getCart);
  const username = sessionStorage.getItem("username");

  return (
    <div className="px-4 py-3 ">
      <h2 className="mt-7 text-xl font-semibold">Your cart, {username}</h2>
      <ul className="divide-y divide-stone-200 border-b mt-3">
        {cart.map((item) => (
          <CartItem item={item} key={item.productId} />
        ))}
      </ul>
      ``
      <div className="mt-6 space-x-2">
        <Link
          to="/order/new"
          className="uppercase px-4 py-3 md:px-8 sm:py-3 font-semibold text-stone-50  inline-block tracking-wide rounded-full hover:bg-blue-800 bg-blue-600 hover:text-stone-100 border  transition-all duration-400">
          Order 
        </Link>
        <button
          className="uppercase  px-4 py-3 md:px-8 sm:py-3 font-semibold text-stone-900  inline-block tracking-wide rounded-full hover:bg-blue-600 bg-white hover:text-stone-100 border border-blue-600 transition-all duration-400"
          onClick={() => dispatch(clearCart())}>
          Clear Cart
        </button>
      </div>
      <ReturnToMenu />
    </div>
  );
}

export default Cart;
