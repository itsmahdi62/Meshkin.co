import * as React from "react";
import Box from "@mui/material/Box";
import "./DataTable.scss";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { ReactComponent as YourSVGIcon } from "./delete.svg";
export default function DataTable(props) {
  const handleDelete = async (id) => {
    const res = await fetch(`http://127.0.0.1:8000/api/v1/${props.slug}/${id}`);
    // console.log(await res.json());
  };

  const actionColumn = {
    field: "action",
    headerName: "Action",
    width: 200,
    sortable: false,
    renderCell: (params) => {
      return (
        <div className="action">
          {/* <Link to={`/${props.slug}/${params.row.id}`}>
            <img src="../../../../public/img/view.svg" alt="" />
          </Link> */}
          <div className="delete" onClick={() => handleDelete(params.row.id)}>
            <YourSVGIcon />
          </div>
        </div>
      );
    },
  };
  return (
    <Box sx={{ height: 800, width: "100%" }}>
      <DataGrid
        className="bg-stone-200 rounded-3xl border-2 border-stone-300 shadow-xl px-8 py-3 "
        rows={props.rows}
        columns={[...props.columns, actionColumn]}
        getRowId={(row) => row._id}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 20,
            },
          },
        }}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        disableColumnFilter
        disableColumnSelector
      />
    </Box>
  );
}
