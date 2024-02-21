import { useSelector } from "react-redux";
import { formatCurrency } from "../../utils/helpers";
import DeleteItem from "./DeleteItem";
import UpdateQuantity from "./UpdataQuantity";
import { getCurrentQuantityById } from "./cartSlice";
function CartItem({ item }) {
  const { productId, name, quantity, totalPrice } = item;

  const currentQuantity = useSelector(getCurrentQuantityById(productId));

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between sm:gap-6">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex justify-between items-center">
        <p className="text-sm font-bold ms-auto me-5">
          {formatCurrency(totalPrice)}
        </p>
        <UpdateQuantity productId={productId} currentQuantity={currentQuantity} />
        <DeleteItem productId={productId} />
      </div>
    </li>
  );
}

export default CartItem;
