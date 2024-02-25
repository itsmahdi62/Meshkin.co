import { useEffect, useState } from "react";
import DataTable from "../dataTable/DataTable";
import Add from "../Add/Add";
import "./ProductsTable.scss";
const columns = [
  { field: "id", headerName: "ID", width: 90 },
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
    <div className="products">
      <div className="info">
        <h1>Products</h1>
        <button onClick={() => setOpen(true)}>Add new Product</button>
      </div>
      <DataTable
        slug="products"
        columns={columns}
        rows={data}
        getRowId={(row) => row._id}
      />
      {open && <Add slug="products" column={columns} setOpen={setOpen} />}
    </div>
  );
};

export default ProductsTable;
