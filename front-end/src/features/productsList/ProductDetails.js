import { useEffect } from "react";
import { useParams } from "react-router-dom";
const ProductDetails = () => {
  const userId = useParams();

  useEffect(() => {
    async function getData() {
      const res = await fetch(
        `http://127.0.0.1:8000/api/v1/products/${userId.id}`
      );
      if (res.status !== 201) throw Error("Failed getting product");
      console.log(res);
    }
    getData();
  }, []);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100"></div>
  );
};

export default ProductDetails;
