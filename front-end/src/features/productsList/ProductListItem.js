import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import { addItem, deleteItem, getCurrentQuantityById } from "../cart/cartSlice";
import { Link } from "react-router-dom";
function ProductListItem({ product }) {
  const dispatch = useDispatch();
  const { id, title, price, imageURL } = product;
  const productId = id;
  const currentQuantity = useSelector(getCurrentQuantityById(id));
  const isInCart = currentQuantity > 0;
  const handleAddToCart = () => {
    const newItem = {
      productId: id,
      title,
      quantity: 1,
      price,
      totalPrice: price * 1,
    };
    dispatch(addItem(newItem));
  };

  return (
    <div className="w-64 min-h-72 flex flex-col shadow-md rounded-[25px] mx-auto border border-stone-300  hover:shadow-blue-300 transition-all duration-500">
      <Link to={`/list/${id}`}>
        <img
          src={imageURL}
          alt={title}
          className="h-28 w-full rounded-tl-[25px] rounded-tr-[25px]"
        />
      </Link>

      <Link to={`/list/${id}`}>
        <p className="font-medium ms-2 mt-2 ">{title}</p>
      </Link>
      <div className="flex p-2 mt-auto justify-between  items-center ">
        <Link to={`/list/${id}`}>
          <div className="me-auto  ">
            <p className="text-sm">{formatCurrency(price)}</p>
          </div>
        </Link>
        <div className="ms-auto ">
          {isInCart && (
            <button
              onClick={() => dispatch(deleteItem(productId))}
              className="uppercase text-xs px-4 py-2 md:px-5 md:py-2.5 font-semibold text-stone-900  inline-block tracking-wide rounded-full hover:bg-blue-600 bg-white hover:text-stone-100 border border-blue-600 transition-all duration-400">
              Delete Item
            </button>
          )}
          {!isInCart && (
            <Button onClick={handleAddToCart} type="small">
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductListItem;
