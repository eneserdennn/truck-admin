import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource.jsx";
import { Link } from "react-router-dom";
import { useState } from "react";

const Datatable = ({response}) => {
  //   if data is not passed in, use the default data
    if (!response) {
        response = userRows
    }

    const rows = [
        { field: "id", headerName: "ID", width: 70 },
        {
            field: "brandName",
            headerName: "Name",
            width: 230,
            renderCell: (response) => {
                return (
                    <div className="brandList">
                        <p>
                            {response.row.truckModelName}
                        </p>
                    </div>
                )
            }
        },
        {
            field: "brandImage",
            headerName: "Image",
            width: 230,
            renderCell: (response) => {
                return (
                    <div className="brandImage">
                        <img src={response.row.truckModelImage} alt="" style={{
                            width: "50%",
                            height: "50%",
                            objectFit: "cover",
                            borderRadius: "10px"

                        }} />
                    </div>
                )
            }
        }
    ]

  let [data, setData] = useState(response);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New Model
        <Link to="/users/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={response}
        columns={[...rows, ...actionColumn]}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;
