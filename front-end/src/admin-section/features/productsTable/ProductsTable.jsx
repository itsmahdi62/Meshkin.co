import { useState } from "react";
import DataTable from "../dataTable/DataTable";
import Add from "../Add/Add";
import "./ProductsTable.scss";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "img",
    headerName: "Image",
    width: 100,
    renderCell: (params) => {
      return <img src={params.row.img} alt="" />;
    },
  },
  {
    field: "title",
    headerName: "Title",
    width: 150,
    type: "string",
  },
  {
    field: "color",
    headerName: "Color",
    width: 150,
    type: "string",
  },
  {
    field: "price",
    headerName: "Price",
    width: 150,
    type: "string",
  },
  {
    field: "producer",
    headerName: "Producer",
    type: "string",
    width: 110,
    editable: true,
  },
  {
    field: "createdAt",
    headerName: "Create At",
    width: 150,
    type: "string",
  },
  {
    field: "inStock",
    headerName: "In Stock",
    width: 150,
    type: "boolean",
  },
];

const ProductsTable = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="products">
      <div className="info">
        <h1>Users</h1>
        <button onClick={() => setOpen(true)}>Add new Product</button>
      </div>
      <DataTable slug="products" columns={columns} rows={"rows"} />
      {open && <Add slug="products" column={columns} setOpen={setOpen} />}
    </div>
  );
};

export default ProductsTable;
