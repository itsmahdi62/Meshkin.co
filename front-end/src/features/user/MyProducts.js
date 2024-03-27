import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../ui/Loader";

const MyProducts = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  useEffect(() => {
    async function getData() {
      const res = await fetch(`http://127.0.0.1:8000/api/v1/orders/${id}`);
      if (res.status !== 200) throw Error("Failed getting product");
      const result = await res.json();

      setData(result.data);
      console.log(data);
    }
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="mt-5">
      <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-4 ">
        {data ? <Loader /> : <>ffk</>}
      </div>
    </div>
  );
};

export default MyProducts;
