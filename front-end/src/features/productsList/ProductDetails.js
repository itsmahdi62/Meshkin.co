import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../../ui/Button";
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
  }, []);
  return (
    <div className="grid grid-cols-3 gap-8 items-center justify-center min-h-screen  pt-8 ">
      <div className="rounded-2xl bg-stone-50   min-h-96 shadow-sm border border-stone-300 mb-auto flex flex-col justify-center px-12 py-4">
        {data && <img className="rounded-2xl" src={data.imageURL} alt="" />}
        <div className="flex my-8">
          <p>Price</p>
          {data && <p className="ms-auto">{data.price}$</p>}
        </div>
        <Button type="primary">Buy Product</Button>
      </div>
      <div className="col-span-2 rounded-2x bg-stone-50 min-h-64 shadow-sm border border-stone-300 mb-auto flex flex-col">
        {/* what is the program */}
        <h2 className="text-blue-600">{data && data.title}</h2>
        <p>{data && data.about}</p>
        <p className="text-purple-500">{data && data.unlimitedFeatures}</p>
        {data && data.benefits && (
          <ul>
            {data.benefits.map((benefit) => (
              <li>{benefit}</li>
            ))}
          </ul>
        )}
        {/* unlimited features*/}
      </div>
    </div>
  );
};

export default ProductDetails;
