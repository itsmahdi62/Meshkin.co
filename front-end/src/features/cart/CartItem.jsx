import { formatCurrency } from "../../utils/helpers";
import DeleteItem from "./DeleteItem";
function CartItem({ item }) {
  const { productId, title, quantity, totalPrice } = item;

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between sm:gap-6">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {title}
      </p>
      <div className="flex justify-between items-center">
        <p className="text-sm font-bold ms-auto me-5">
          {formatCurrency(totalPrice)}
        </p>
        <DeleteItem productId={productId} />
      </div>
    </li>
  );
}

export default CartItem;
