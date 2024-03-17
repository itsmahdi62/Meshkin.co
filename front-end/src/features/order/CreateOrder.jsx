import { Form, redirect, useActionData, useNavigate } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useSelector } from "react-redux";
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";
import { formatCurrency } from "../../utils/helpers";
import { useState } from "react";
import ReturnToMenu from "../../ui/ReturnToMenu";

function CreateOrder() {
  const [coin, setCoin] = useState(false);
  const [avalableCoins] = useState(["Btc", "Eth", "Teron", "Ada"]);
  const navigation = useNavigate();
  const isSubmitting = navigation.state === "submitting";

  const formErrors = useActionData();

  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalCartPrice);
  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      {/* <Form method="POST" action="/order/new"> */}
      <Form method="POST">
        {avalableCoins.map((avalableCoin) => (
          <div className="mb-7 flex">
            <input
              type="radio"
              name="priority"
              id="priority"
              className="h-6 w-6 accent-blue-500 focus:outline-none  md:px-6 md:py-3 focus:ring-offset-2"
              value={coin}
              onChange={(e) => setCoin(e.target.checked)}
            />
            <label className="font-medium ms-5">{avalableCoin}</label>
          </div>
        ))}

        <div>
          <input
            type="hidden"
            name="cart"
            className="border border-red-500"
            value={JSON.stringify(cart)}
          />
          <Button type="primary" disabled={isSubmitting}>
            {isSubmitting
              ? "Placing order...."
              : `Order now from ${formatCurrency(totalCartPrice)}`}
          </Button>
        </div>
      </Form>
      <ReturnToMenu />
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority ? true : false,
  };
  const errors = {};

  if (Object.keys(errors).length > 0) return errors;
  // if everything is ok create new order and redirect
  const newOrder = await createOrder(order);
  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
