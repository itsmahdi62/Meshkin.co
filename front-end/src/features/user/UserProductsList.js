import { useEffect, useState } from "react";
import Loader from "../../ui/Loader";
import { Link } from "react-router-dom";
const UserProductsList = () => {
  const [data, setData] = useState();
  useEffect(() => {
    const getList = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/v1/orders/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: "laura@example.com",
          }),
        });
        const result = await response.json();
        setData(result.result);
      } catch {
        console.log("Fail to get list");
      }
    };
    getList();
    console.log(data);
  }, []);

  // console.log(data);
  return (
    <div className="mt-5 grid  grid-cols-1 gap-6 sm:grid-cols-4 ">
      {data ? (
        <>
          {data.map((myProduct) => (
            <Link to={`/userProducts/${myProduct.id}`} key={myProduct.id}>
              <div className="w-60 h-72 shadow-md rounded-[25px] mx-auto border border-stone-300  hover:shadow-blue-300 transition-all duration-500">
                <img
                  src={myProduct.imageURL}
                  alt={myProduct.title}
                  className="h-28 w-full rounded-tl-[25px] rounded-tr-[25px]"
                />
                <div className="flex flex-col grow pt-0.5 ">
                  <p className="font-medium ms-4 mt-4 ">{myProduct.title}</p>
                </div>
              </div>
            </Link>
          ))}
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default UserProductsList;
