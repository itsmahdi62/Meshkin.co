import { useEffect, useState } from "react";
import DataTable from "../dataTable/DataTable";
import Add from "../Add/Add";

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
      console.log(data);
      setData(data);
    };
    getList();
  }, []);

  return (
    <div className="users">
      <div className="info">
        <h1>Users</h1>
        <button onClick={() => setOpen(true)}>Add new user</button>
      </div>
      <DataTable
        slug="slug"
        columns={columns}
        rows={data}
        getRowId={(row) => row._id}
      />
      {open && <Add slug="user" column={columns} setOpen={setOpen} />}
    </div>
  );
};

export default Users;
