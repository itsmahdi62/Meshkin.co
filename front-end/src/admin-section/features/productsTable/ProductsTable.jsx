import { useEffect, useState } from "react";
import DataTable from "../dataTable/DataTable";
import Add from "../Add/Add";
import { Link } from "react-router-dom";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "title",
    headerName: "title",
    width: 250,
    type: "string",
  },
  {
    field: "imageURL",
    headerName: "Image",
    width: 100,
    renderCell: (params) => {
      return <img src={params.row.img} alt="" />;
    },
  },
  {
    field: "name",
    headerName: "Name",
    width: 150,
    type: "string",
  },
  {
    field: "duration",
    headerName: "Duration",
    width: 120,
    type: "snumber",
  },
  {
    field: "price",
    headerName: "Price",
    width: 150,
    type: "string",
  },
  {
    field: "plan",
    headerName: "plan",
    width: 150,
    type: "string",
  },
  {
    field: "about",
    headerName: "about",
    width: 150,
    type: "string",
  },
  {
    field: "unlimitedFeatures",
    headerName: "unlimitedFeatures",
    width: 150,
    type: "string",
  },
  {
    field: "benefits",
    headerName: "benefits",
    width: 150,
    type: ["string"],
  },
];

const ProductsTable = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState("");
  useEffect(() => {
    const getList = async () => {
      const res = await fetch("http://127.0.0.1:8000/api/v1/products");
      if (res.status !== 200) throw Error("Failed getting List");

      const { data } = await res.json();
      setData(data);
    };
    getList();
  }, []);
  return (
    <div className="">
      <div className="flex items-center gap-5 mb-5 ">
        <span className="text-white bg-blue-800  py-5 px-3 rounded-lg shadow-lg">
          Products Table
        </span>
        <button
          className="text-white bg-blue-600  py-5 px-3 rounded-lg shadow-lg"
          onClick={() => setOpen(true)}>
          Add new product
        </button>
        <Link
          to="/users"
          className="text-white bg-blue-600 ms-auto py-5 px-3 rounded-lg shadow-lg hover:bg-blue-800 transition-all duration-300">
          Users Table
        </Link>
        <Link
          to="/orders"
          className="text-white bg-blue-600  py-5 px-3 rounded-lg shadow-lg hover:bg-blue-800 transition-all duration-300">
          Orders Table
        </Link>
      </div>
      <DataTable
        slug="products"
        columns={columns}
        rows={data}
        getRowId={(row) => row._id}
      />
      {open && <Add slug="products" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default ProductsTable;
