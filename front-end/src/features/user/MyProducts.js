import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../../ui/Loader";

const MyProducts = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  useEffect(() => {
    async function getData() {
      const res = await fetch(`http://127.0.0.1:8000/api/v1/orders/${id}`);
      if (res.status !== 200) throw Error("Failed getting product");
      const result = await res.json();

      setData(result.product);
    }
    getData();
    console.log(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(data);
  return (
    <div className="mt-5">
      {data ? (
        <div className="flex flex-col my-4 mx-auto ">
          {/* {data.videoURLs.map((product) => (
            <Link
              to={`${product}`}
              className="bg-stone-300 my-5 text-2xl text-black py-3 pe-8 ps-4">
              {product}
            </Link>
          ))} */}
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default MyProducts;
