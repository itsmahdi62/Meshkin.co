import { useEffect, useState } from "react";
import DataTable from "../dataTable/DataTable";
import Add from "../Add/Add";
import { Link } from "react-router-dom";

const columns = [
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "name",
    headerName: "Name",
    width: 200,
    editable: true,
    description: "This column has a value getter and is not sortable.",
    sortable: false,
  },
  {
    field: "email",
    headerName: "email",
    width: 200,
  },
  {
    field: "role",
    headerName: "Role",
    width: 110,
    editable: true,
  },
  {
    field: "password",
    headerName: "Password",
    width: 0,
    editable: false,
  },
  {
    field: "passwordConfirm",
    headerName: "PasswordConfirm",
    width: 0,
    editable: false,
  },
];

// const rows = [
//   { id: 1, lastName: "Snow", firstName: "Jon", age: 14 },
//   { id: 2, lastName: "Lannister", firstName: "Cersei", age: 31 },
//   { id: 3, lastName: "Lannister", firstName: "Jaime", age: 31 },
//   { id: 4, lastName: "Stark", firstName: "Arya", age: 11 },
//   { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
//   { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
//   { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
//   { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
//   { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
// ];

const Users = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState("");
  useEffect(() => {
    const getList = async () => {
      const res = await fetch("http://127.0.0.1:8000/api/v1/users");
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
          Users
        </span>
        <button
          className="text-white bg-blue-600  py-5 px-3 rounded-lg shadow-lg"
          onClick={() => setOpen(true)}>
          Add new user
        </button>
        <Link
          to="/productsTable"
          className="text-white bg-blue-600 ms-auto py-5 px-3 rounded-lg shadow-lg hover:bg-blue-800 transition-all duration-300">
          Product Table
        </Link>
        <Link
          to="/orders"
          className="text-white bg-blue-600  py-5 px-3 rounded-lg shadow-lg hover:bg-blue-800 transition-all duration-300">
          Orders Table
        </Link>
      </div>
      <DataTable
        slug="users"
        columns={columns}
        rows={data}
        getRowId={(row) => row._id}
      />
      {open && <Add slug="user" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default Users;
