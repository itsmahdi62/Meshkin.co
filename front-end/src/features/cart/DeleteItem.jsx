import Button from "../../ui/Button";
import { useDispatch } from "react-redux";
import { deleteItem } from "./cartSlice";
const DeleteItem = ({productId}) => {
  const dispatch = useDispatch();

  return (
    <Button type="small" onClick={() => dispatch(deleteItem(productId))}>
      Delete
    </Button>
  );
};

export default DeleteItem;
