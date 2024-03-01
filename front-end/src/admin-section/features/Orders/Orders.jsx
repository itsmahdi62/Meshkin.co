import { useEffect, useState } from "react";
import DataTable from "../dataTable/DataTable";
import Add from "../Add/Add";
import { Link } from "react-router-dom";

const columns = [
  { field: "user", headerName: "User", width: 250 },
  {
    field: "products",
    headerName: "Products",
    width: 200,
    editable: true,
    description: "This column has a value getter and is not sortable.",
    sortable: false,
  },
  {
    field: "price",
    headerName: "Price",
    width: 200,
  },
  {
    field: "isPaid",
    headerName: "isPaid",
    width: 110,
    editable: true,
  },
];

const Orders = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState("");
  useEffect(() => {
    const getList = async () => {
      const res = await fetch("http://127.0.0.1:8000/api/v1/orders");
      if (res.status !== 200) throw Error("Failed getting List");

      const { data } = await res.json();
      setData(data);
      setData(
        data.map((row) => ({
          ...row,
          id: row._id, // Add 'id' field based on the '_id' field
        }))
      );
    };
    getList();
  }, []);
  // const transformedData = data.map((row) => ({
  //   ...row,
  //   id: row._id, // Add 'id' field based on the '_id' field
  // }));
  return (
    <div className="">
      <div className="flex items-center gap-5 mb-5 ">
        <span className="text-white bg-blue-800  py-5 px-5 rounded-lg shadow-lg">
          Orders
        </span>
        <button
          className="text-white bg-blue-600  py-5 px-3 rounded-lg shadow-lg"
          onClick={() => setOpen(true)}>
          Add new Order
        </button>
        <Link
          to="/productsTable"
          className="text-white bg-blue-600 ms-auto py-5 px-3 rounded-lg shadow-lg hover:bg-blue-800 transition-all duration-300">
          Product Table
        </Link>
      </div>
      <DataTable
        slug="orders"
        columns={columns}
        rows={data}
        getRowId={(row) => row._id}
      />
      {open && <Add slug="order" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default Orders;
