import { redirect, useNavigate } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useSelector } from "react-redux";
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import Loader from "../../ui/Loader";
import store from "../../store";
import { formatCurrency } from "../../utils/helpers";
import { useEffect, useState } from "react";
import ReturnToMenu from "../../ui/ReturnToMenu";

function CreateOrder() {
  const [coin, setCoin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hashId, setHashId] = useState();

  const [coinPrices, setCoinPrices] = useState({
    btc: 0,
    eth: 0,
    tron: 0,
    ada: 0,
  });

  const totalCartPrice = useSelector(getTotalCartPrice);
  const price = formatCurrency(totalCartPrice);
  const [avalableCoins, setAvalableCoins] = useState([
    {
      label: "Btc",
      wallet: "15wWzRXtgpDyQ5vSdtpDyWrpk3tkJNH9zc",
      network: "Bitcoin",
      price: coinPrices.btc,
      amount: 0,
    },
    {
      label: "Eth",
      wallet:
        "addr1q8gcefxpnnlukhfduvjagjy7k3x4dx9scmvgd557d755qjpyas0w75sham58dmm56vz2jydr7vd060wq7eswekll28xqvr8que",
      network: "ERC20",
      price: coinPrices.eth,
      amount: 0,
    },
    {
      label: "Trx",
      wallet: "TV63SGWfJmwsuu1aLZf1rzu59gmMmySM9M",
      network: "TRC20",
      price: coinPrices.tron,
      amount: 0,
    },
    {
      label: "Ada",
      wallet:
        "addr1q8gcefxpnnlukhfduvjagjy7k3x4dx9scmvgd557d755qjpyas0w75sham58dmm56vz2jydr7vd060wq7eswekll28xqvr8que",
      network: "CARDANO ADA",
      price: coinPrices.ada,
      amount: 0,
    },
  ]);
  // getting coins price
  useEffect(() => {
    const getPrice = async () => {
      let response = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
      );
      const btcPrice = await response.json();

      response = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
      );
      const ethPrice = await response.json();

      response = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=tron&vs_currencies=usd"
      );
      const tronPrice = await response.json();

      response = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=cardano&vs_currencies=usd"
      );
      const adaPrice = await response.json();

      // console.log(Math.random() * (0.0025 - 0.002) + 0.002);
      setCoinPrices({
        btc: btcPrice.bitcoin,
        eth: ethPrice.ethereum,
        tron: tronPrice.tron,
        ada: adaPrice.cardano,
      });
      setIsLoading(false);
    };

    // Run getPrice on component mount
    getPrice();

    // Update avalableCoins with new coinPrices

    setAvalableCoins([
      {
        label: "Btc",
        wallet: "15wWzRXtgpDyQ5vSdtpDyWrpk3tkJNH9zc",
        network: "Bitcoin",
        price: coinPrices.btc.usd,
      },
      {
        label: "Eth",
        wallet:
          "addr1q8gcefxpnnlukhfduvjagjy7k3x4dx9scmvgd557d755qjpyas0w75sham58dmm56vz2jydr7vd060wq7eswekll28xqvr8que",
        network: "ERC20",
        price: coinPrices.eth.usd,
      },
      {
        label: "Trx",
        wallet: "TV63SGWfJmwsuu1aLZf1rzu59gmMmySM9M",
        network: "TRC20",
        price: coinPrices.tron.usd,
      },
      {
        label: "Ada",
        wallet:
          "addr1q8gcefxpnnlukhfduvjagjy7k3x4dx9scmvgd557d755qjpyas0w75sham58dmm56vz2jydr7vd060wq7eswekll28xqvr8que",
        network: "CARDANO ADA",
        price: coinPrices.ada.usd,
      },
    ]);
  }, []);
  const navigation = useNavigate();
  const isSubmitting = navigation.state === "submitting";
  const cart = useSelector(getCart);
  if (!cart.length) return <EmptyCart />;

  const handleRadioChange = (event) => {
    setCoin(event.target.value);
  };

  const checkTransactionHandler = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/v1/checktransaction/${coin}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            hashId,
            email: sessionStorage.getItem("email"),
            products: cart,
          }),
        }
      );
      const result = await response.json();
      if (result.status === "success") {
        navigation("MyProducts");
      } else {
        console.log("payment not verified yet , check it in few seconds later");
      }
    } catch (e) {
      alert(e);
    }
  };

  return (
    <div className="px-4 py-2">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h2 className="mb-8 text-xl font-semibold">
            Ready to order? Let's go!
          </h2>
          {avalableCoins.map((avalableCoin) => (
            <div
              className="mb-7  flex flex-wrap border border-stone-300 p-5 rounded-lg"
              key={avalableCoin.label}>
              <input
                type="radio"
                name="priority"
                id="priority"
                className="h-6 w-4 me-5  accent-blue-500 focus:outline-none  md:px-6 md:py-3 focus:ring-offset-2"
                value={avalableCoin.label}
                onChange={handleRadioChange}
              />
              <label className="font-medium me-16">{avalableCoin.label}</label>
              <label className="font-medium me-16">
                Network : {avalableCoin.network}
              </label>
              <label className="font-medium me-16">
                Current Coin Price : {avalableCoin.price}
              </label>
              <label className="font-medium me-16">
                Amount you should pay exactly :
                {totalCartPrice / avalableCoin.price}
              </label>
              <label className="font-medium ">
                Address : {avalableCoin.wallet}
              </label>
            </div>
          ))}

          <div className="text-center mt-5 flex flex-col">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password">
              Enter your transactionhash
            </label>
            <input
              className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="hash"
              type="text"
              value={hashId}
              onChange={(e) => setHashId(e.target.value)}
              placeholder="Enter your hashId"
            />
          </div>
          <div className="mt-5 flex">
            <Button type="primary" disabled={isSubmitting}>
              {isSubmitting ? "Placing order...." : `Pay ${price}`}
            </Button>
            <button
              onClick={checkTransactionHandler}
              className="bg-blue-600 ms-8 uppercase text-sm font-semibold text-stone-100  inline-block tracking-wide rounded-full hover:bg-blue-400 transition-colors duration-300 focus:outline-none  focus:bg-blue-400  disabled:cursor-not-allowed  px-4 py-3 md:px-6 sm:py-4"
              disabled={isSubmitting}>
              Check transaction
            </button>
          </div>
          <ReturnToMenu />
        </>
      )}
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
