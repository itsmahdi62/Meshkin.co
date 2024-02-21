import LinkButton from "../../ui/LinkButton";

function EmptyCart() {
  return (
    <div className="py-3 px-4">
      <LinkButton to="/">&larr; Back to List</LinkButton>

      <p className="font-semibold mt-7">
        Your cart is still empty. Start adding some products :)
      </p>
    </div>
  );
}

export default EmptyCart;
