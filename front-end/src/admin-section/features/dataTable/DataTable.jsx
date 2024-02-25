import * as React from "react";
import Box from "@mui/material/Box";
import "./DataTable.scss";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link } from "@mui/material";

export default function DataTable(props) {
  const handleDelete = (id) => {
    return id;
    //axios.delete/(`/api/4{slug}/id`)
  };

  const actionColumn = {
    field: "action",
    headerName: "Action",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="action">
          {/* <Link to={`/${props.slug}/${params.row.id}`}>
            <img src="../../../../public/img/view.svg" alt="" />
          </Link> */}
          <div className="delete" onClick={() => handleDelete(params.row.id)}>
            <img src="../../../../public/img/delete.svg" alt="" />
          </div>
        </div>
      );
    },
  };
  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        className="bg-stone-200 rounded-3xl border-2 border-stone-300 shadow-xl p-8 "
        rows={props.rows}
        columns={[...props.columns, actionColumn]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
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
