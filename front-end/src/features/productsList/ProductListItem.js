import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import { addItem, getCurrentQuantityById } from "../cart/cartSlice";
import DeleteItem from "../cart/DeleteItem";
import UpdateQuantity from "../cart/UpdataQuantity";
function ProductListItem({ product }) {
  const dispatch = useDispatch();

  const { id, name, price, duration, image } = product;

  const currentQuantity = useSelector(getCurrentQuantityById(id));
  const isInCart = currentQuantity > 0;
  const handleAddToCart = () => {
    const newItem = {
      productId: id,
      name,
      quantity: 1,
      price,
      totalPrice: price * 1,
    };
    dispatch(addItem(newItem));
  };

  return (
    <li className="flex gap-4 py-2">
      <img src={image} alt={name} className="h-24" />
      <div className="flex flex-col grow pt-0.5">
        <p className="font-medium">{name}</p>
        <div className="mt-auto flex  items-center justify-between">
          <p className="text-sm">{formatCurrency(price)}</p>

          {isInCart && (
            <div className="flex items-center gap-3 sm:gap-8">
              <UpdateQuantity pizzaId={id} />
              <DeleteItem pizzaId={id} />
            </div>
          )}
          { !isInCart && (
            <Button className="small" onClick={handleAddToCart} type="small">
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default ProductListItem;
