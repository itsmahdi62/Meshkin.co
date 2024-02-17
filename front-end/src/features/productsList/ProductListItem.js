import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import { addItem, getCurrentQuantityById } from "../cart/cartSlice";
import DeleteItem from "../cart/DeleteItem";
import UpdateQuantity from "../cart/UpdataQuantity";
import { Link } from "react-router-dom";
function ProductListItem({ product }) {
  const dispatch = useDispatch();
  const { id, name, price, duration, imageURL, plan } = product;

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
    <div className="w-60 h-72 shadow-md rounded-[25px] mx-auto border border-stone-300  hover:shadow-blue-300 transition-all duration-500">
      <Link to={`/list/${id}`}>
        <img
          src={imageURL}
          alt={name}
          className="h-28 w-full rounded-tl-[25px] rounded-tr-[25px]"
        />
        <div className="flex flex-col grow pt-0.5">
          <p className="font-medium ms-2 mt-2 ">{name}</p>
          <div className=" flex flex-col p-2 justify-between ">
            <div className="me-auto min-h-20">
              <p className="text-sm">{formatCurrency(price)}</p>
              <p className="text-sm">{duration} Month</p>
              <p className="text-sm font-extralight">
                {plan === "none" ? "" : `${plan}`}
              </p>
            </div>
            <div className="ms-auto">
              {isInCart && (
                <div className="flex items-center gap-3 sm:gap-8">
                  <UpdateQuantity pizzaId={id} />
                  <DeleteItem pizzaId={id} />
                </div>
              )}
              {!isInCart && (
                <Button
                  className="small"
                  onClick={handleAddToCart}
                  type="small">
                  Add to cart
                </Button>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ProductListItem;
