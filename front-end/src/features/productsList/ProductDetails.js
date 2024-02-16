import { useEffect } from "react";
import { useParams } from "react-router-dom";
const ProductDetails = () => {
  const userId = useParams();

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
      console.log(await res.json());
    }
    getData();
  }, []);
  return (
    <div className="grid grid-cols-3 gap-8 items-center justify-center min-h-screen  border border-red-400 pt-8 ">
      <div className="rounded-2xl bg-stone-50   min-h-64 border border-red-400 mb-auto"></div>
      <div className="col-span-2 rounded-2xl bg-stone-50   min-h-64 border border-red-400 mb-auto"></div>
    </div>
  );
};

export default ProductDetails;
