import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { decreaseItemQuantity, increaseItemQuantity } from "./cartSlice";

const UpdateQuantity = ({ productId, currentQuantity }) => {
  const dispatch = useDispatch();
  return (
    <div className="flex gap-2 me-3 items-center md:gap-3">
      <Button
        type="round"
        onClick={() => dispatch(increaseItemQuantity(productId))}>
        +
      </Button>
      <span className="text-sm font-medium">{currentQuantity}</span>
      <Button
        type="round"
        onClick={() => dispatch(decreaseItemQuantity(productId))}>
        -
      </Button>
    </div>
  );
};

export default UpdateQuantity;
