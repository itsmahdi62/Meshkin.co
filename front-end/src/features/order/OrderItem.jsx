import { formatCurrency } from "../../utils/helpers.js";
function OrderItem({ item }) {
  const { quantity, title, totalPrice } = item;

  return (
    <li className="py-3">
      <div className="flex items-center justify-between">
        <p className="gap-4 text-sm">
          <span className="font-bold">{quantity}&times;</span> {title}
        </p>
        <p>{formatCurrency(totalPrice)}</p>
      </div>
    </li>
  );
}

export default OrderItem;
