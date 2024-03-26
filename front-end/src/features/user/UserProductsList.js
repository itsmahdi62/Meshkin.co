import { useEffect, useState } from "react";

const UserProductsList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getList = async () => {
      const response = await fetch("http://127.0.0.1:8000/api/v1/products");
      setData(await response.json());
    };

    getList();
  }, []);

  return (
    <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-4 ">
      {data.map((myProduct) => (
        <div className="w-60 h-72 shadow-md rounded-[25px] mx-auto border border-stone-300  hover:shadow-blue-300 transition-all duration-500">
          <img
            src={myProduct.imageURL}
            alt={myProduct.name}
            className="h-28 w-full rounded-tl-[25px] rounded-tr-[25px]"
          />

          <div className="flex flex-col grow pt-0.5 ">
            <p className="font-medium ms-2 mt-2 ">{myProduct.name}</p>
            <div className=" flex flex-col p-2 justify-between ">
              <div className="me-auto min-h-20 "></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserProductsList;
