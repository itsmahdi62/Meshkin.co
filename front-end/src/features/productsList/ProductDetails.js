import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../../ui/Button";
import { TbBrandSpeedtest } from "react-icons/tb";
import { MdHeadphones } from "react-icons/md";
import { addItem, getCurrentQuantityById } from "../cart/cartSlice";

const ProductDetails = () => {
  const userId = useParams();
  const [data, setData] = useState();
  useEffect(() => {
    async function getData() {
      const res = await fetch(
        `http://127.0.0.1:8000/api/v1/products/${userId.id}`,
        {
          method: "GET",
          maxBodyLength: Infinity,
          // url: "127.0.0.1:8000/api/v1/users/login",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer null",
          },
        }
      );
      // if (res.status !== 201) throw Error("Failed getting product");
      const result = await res.json();

      setData(result.data);
      console.log(data);
    }
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { id, name, price } = data;
  const handleAddToCart = () => {
    const newItem = {
      productId: id,
      name,
      quantity: 1,
      price,
      totalPrice: price * 1,
    };
    dispatchEvent(addItem(newItem));
  };
  return (
    <div className="grid grid-cols-3 gap-8 items-center justify-center min-h-screen  pt-8 ">
      <div className="rounded-2xl bg-stone-50   min-h-96 shadow-sm border border-stone-300 mb-auto flex flex-col justify-center px-12 py-4">
        {data && <img className="rounded-2xl" src={data.imageURL} alt="" />}
        <div className="flex my-8">
          <p>Price</p>
          {data && <p className="ms-auto">{data.price}$</p>}
        </div>
        <Button type="primary" onClick={handleAddToCart}>
          Buy Product
        </Button>
      </div>
      <div className="col-span-2 px-12 py-4 rounded-2xl bg-stone-50 min-h-64 shadow-sm border border-stone-300 mb-auto flex flex-col">
        {/* what is the program */}
        <h2 className="text-blue-600 mb-12 text-3xl font-bold">
          {data && data.title}
        </h2>
        <hr className="border border-stone-300 mb-8 " />
        <p className="leading-8 text-pretty mb-8">{data && data.about}</p>
        <h3 className="font-bold text-2xl text-stone-400 mb-6">
          Purchase premium app
        </h3>
        <p className="leading-8 mb-8">{data && data.unlimitedFeatures}</p>
        {/* unlimited features*/}
        {data && data.benefits && (
          <ul className="list-disc">
            {data.benefits.map((benefit) => (
              <li className="my-2 font-light">{benefit}</li>
            ))}
          </ul>
        )}
        <div className="flex mt-8 py-6 bg-stone-200 rounded-2xl justify-center">
          <div className="flex  items-center">
            <TbBrandSpeedtest />
            <span>Instant delivery</span>
          </div>
          <hr className="mx-6  border-l-2 border-stone-500 h-6" />
          <div className="flex  items-center">
            <MdHeadphones />
            <span>24h support</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
