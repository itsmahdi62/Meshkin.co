import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import { useSelector } from "react-redux";
import { getCart, getTotalCartPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import Loader from "../../ui/Loader";
import { formatCurrency } from "../../utils/helpers";
import { useEffect, useState } from "react";
import ReturnToMenu from "../../ui/ReturnToMenu";

function CreateOrder() {
  const [selectedCoin, setSelectedCoin] = useState("");
  const [finalAmount, setFinalAmount] = useState("");
  const [successResult, setSuccessResult] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hashId, setHashId] = useState("");
  const [inputLength, setInputLength] = useState(null);
  const [readytofetch, setReadyToFetch] = useState(false);
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
    },
    {
      label: "Eth",
      wallet:
        "addr1q8gcefxpnnlukhfduvjagjy7k3x4dx9scmvgd557d755qjpyas0w75sham58dmm56vz2jydr7vd060wq7eswekll28xqvr8que",
      network: "ERC20",
      price: coinPrices.eth,
    },
    {
      label: "Trx",
      wallet: "TV63SGWfJmwsuu1aLZf1rzu59gmMmySM9M",
      network: "TRC20",
      price: coinPrices.tron,
    },
    {
      label: "Ada",
      wallet:
        "addr1q8gcefxpnnlukhfduvjagjy7k3x4dx9scmvgd557d755qjpyas0w75sham58dmm56vz2jydr7vd060wq7eswekll28xqvr8que",
      network: "CARDANO ADA",
      price: coinPrices.ada,
    },
  ]);
  // getting coins price
  useEffect(() => {
    const getPrice = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,tron,cardano&vs_currencies=usd"
        );
        const prices = await response.json();
        setCoinPrices({
          btc: prices.bitcoin,
          eth: prices.ethereum,
          tron: prices.tron,
          ada: prices.cardano,
        });

        // Update avalableCoins with new coinPrices
        const updatedCoins = [
          {
            label: "Btc",
            wallet: "15wWzRXtpDyQ5vSdtpDyWrpk3tkJNH9zc",
            network: "Bitcoin",
            price: prices.bitcoin.usd,
          },
          {
            label: "Eth",
            wallet:
              "addr1q8gcefxpnnlukhfduvjagjy7k3x4dx9scmvgd557d755qjpyas0w75sham58dmm56vz2jydr7vd060wq7eswekll28xqvr8que",
            network: "ERC20",
            price: prices.ethereum.usd,
          },
          {
            label: "Trx",
            wallet: "TV63SGWfJmwsuu1aLZf1rzu59gmMmySM9M",
            network: "TRC20",
            price: prices.tron.usd,
          },
          {
            label: "Ada",
            wallet:
              "addr1q8gcefxpnnlukhfduvjagjy7k3x4dx9scmvgd557d755qjpyas0w75sham58dmm56vz2jydr7vd060wq7eswekll28xqvr8que",
            network: "CARDANO ADA",
            price: prices.cardano.usd,
          },
        ];

        setAvalableCoins(updatedCoins);
      } catch {}
    };
    // Run getPrice on component mount
    getPrice();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const temp = avalableCoins.find(
      (avalableCoin) => selectedCoin === avalableCoin.label
    );
    if (temp) {
      setFinalAmount(totalCartPrice / temp.price);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCoin]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setInputLength(hashId.length);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [hashId]);

  useEffect(() => {
    if (inputLength === 64) {
      setReadyToFetch(true);
    } else if (inputLength !== null) {
      setReadyToFetch(false);
    }
  }, [inputLength]);

  const navigation = useNavigate();
  const isSubmitting = navigation.state === "submitting";
  const cart = useSelector(getCart);
  if (!cart.length) return <EmptyCart />;

  const handleRadioChange = (event) => {
    setSelectedCoin(event.target.value);
  };

  const checkTransactionHandler = async () => {
    if (readytofetch) {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/v1/checktransaction/${selectedCoin}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              hashId,
              // email: sessionStorage.getItem("email"),
              email: "laura@example.com",
              products: cart,
              amount: 59.9,
            }),
          }
        );
        const result = await response.json();
        console.log(result);
        if (result.status === "success") {
          setSuccessResult("Successfull payment");
          setTimeout(() => {
            navigation("/userProducts");
          }, 3000);
        } else {
          async function setErrorWithDelay(errorMessage, delay) {
            setError(errorMessage);
            await new Promise((resolve) => setTimeout(resolve, delay));
            setError(null);
          }
          setErrorWithDelay(
            "payment is not verified yet , check it few seconds later !",
            3000
          );
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      async function setErrorWithDelay(errorMessage, delay) {
        setError(errorMessage);
        await new Promise((resolve) => setTimeout(resolve, delay));
        setError(null);
      }
      setErrorWithDelay("Hash id must be 64 characters", 3000);
    }
  };
  return (
    <div className="px-4 py-2">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {avalableCoins.map((avalableCoin) => (
            <div
              className="mb-4  flex flex-wrap border border-stone-300 p-5 rounded-lg"
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
              required
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
          {successResult !== null && (
            <div className="absolute bottom-48 lg:left-[700px] rounded-lg my-5 px-12 py-8 text-center bg-green-300">
              {successResult}
            </div>
          )}
          {error !== null && (
            <div className="absolute bottom-48 lg:left-[700px] rounded-lg my-5 px-12 py-8 text-center bg-red-300">
              {error}
            </div>
          )}
          <ReturnToMenu />
        </>
      )}
    </div>
  );
}

export default CreateOrder;
