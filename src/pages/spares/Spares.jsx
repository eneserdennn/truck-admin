import {useState, useEffect} from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Datatable from "../../components/datatable/Datatable";
import {useNavigate, createSearchParams} from "react-router-dom";
import {DataGrid} from "@mui/x-data-grid";
import {fetchspares, createspare, deletespare} from "../../store/spare/spareSlice";
import {useDispatch, useSelector} from "react-redux";


import {useLocation} from "react-router-dom";

import "./modal.scss";

const Spares = () => {
    const dispatch = useDispatch();
    const response = useSelector((state) => state.spare.spares);
    const status = useSelector((state) => state.spare.status);
    const error = useSelector((state) => state.spare.error);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedspare, setSelectedspare] = useState({
        sparePartName: "",
        sparePartImage: "",
        modelId: "",
        sparePartOemNo: "",
        sparePartAlternateNo: "",
        stockState: "",
    });

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchspares());
    }, [dispatch]);

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    if (status === "failed") {
        return <div>Error: {error}</div>;
    }

    const openModal = () => {
        setSelectedspare({
            sparePartName: "",
            sparePartImage: "",
            modelId: "",
            sparePartOemNo: "",
            sparePartAlternateNo: "",
            stockState: "",
        });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleAddspare = () => {
        dispatch(createspare(selectedspare));
        closeModal();
        window.location.reload();
    };

    const rows = [

        {field: "id", headerName: "ID", width: 70},
        {
            field: "spareName",
            headerName: "Name",
            width: 230,
            renderCell: (response) => {
                return (
                    <div className="spareList">
                        <p>{response.row.sparePartName}</p>
                    </div>
                );
            },
        },
        {
            field: "spareImage",
            headerName: "Image",
            width: 230,
            renderCell: (response) => {
                return (
                    <div className="modeImage">
                        <img
                            src={response.row.sparePartImage}
                            alt=""
                            style={{
                                width: "50%",
                                height: "50%",
                                objectFit: "cover",
                                borderRadius: "10px",
                            }}
                        />
                    </div>
                );
            },
        },
        {
            field: "truckId",
            headerName: "Model ID",
            width: 230,
            renderCell: (response) => {
                return (
                    <div className="spareList">
                        <p>{response.row.modelId}</p>
                    </div>
                );
            },
        },
        {
            field: "sparePartOemNo",
            headerName: "Spare Part Oem No",
            width: 230,
            renderCell: (response) => {
                return (
                    <div className="spareList">
                        <p>{response.row.sparePartOemNo}</p>
                    </div>
                );
            },
        },
        {
            field: "sparePartAlternateNo",
            headerName: "Spare Part Alt No",
            width: 230,
            renderCell: (response) => {
                return (
                    <div className="spareList">
                        <p>{response.row.sparePartAlternateNo}</p>
                    </div>
                );
            },
        },
        {
            field: "stockState",
            headerName: "Stock State",
            width: 230,
            renderCell: (response) => {
                return (
                    <div className="spareList">
                        {response.row.stockState == 1 ? (
                            <p>Available</p>
                        ) : (
                            <p>Not Available</p>
                        )}

                    </div>
                );
            },
        },
    ];

    const actionColumn = [
        {
            field: "action",
            headerName: "Action",
            width: 200,
            renderCell: (params) => {
                const handleEdit = () => {
                    navigate(`/spares/${params.row.id}`, {state: params.row});
                };

                const handleDelete = () => {
                    // ask the user if they are sure to delete the record
                    if (window.confirm("Are you sure to delete this spare?")) {
                        dispatch(deletespare(params.row.id));
                    }
                };

                return (
                    <div className="cellAction">
                        <div className="editButton" onClick={handleEdit}>
                            View
                        </div>
                        <div className="deleteButton" onClick={handleDelete}>
                            Delete
                        </div>
                    </div>
                );
            },
        },
    ];

    return (
        <div className="list">
            <Sidebar/>
            <div className="listContainer">
                <Navbar/>
                <div className="datatable">
                    <div className="datatableTitle">
                        Add New Spare
                        <div className="link" onClick={() => openModal(null)}>
                            Add New
                        </div>
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
                {isModalOpen && (
                    <div className="modal">
                        <div className="modalContent">
                            <h2>Add spare</h2>
                            <form>
                                <div className="formGroup">
                                    <label>Name:</label>
                                    <input
                                        type="text"
                                        value={selectedspare.sparePartName}
                                        onChange={(e) =>
                                            setSelectedspare({
                                                ...selectedspare,
                                                sparePartName: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="formGroup">
                                    <label>Image:</label>
                                    <input
                                        type="text"
                                        value={selectedspare.sparePartImage}
                                        onChange={(e) =>
                                            setSelectedspare({
                                                ...selectedspare,
                                                sparePartImage: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="formGroup">
                                    <label>Model ID:</label>
                                    <input
                                        type="text"
                                        value={selectedspare.modelId}
                                        onChange={(e) =>
                                            setSelectedspare({
                                                ...selectedspare,
                                                modelId: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="formGroup">
                                    <label>Spare Part Oem No:</label>
                                    <input
                                        type="text"
                                        value={selectedspare.sparePartOemNo}
                                        onChange={(e) =>
                                            setSelectedspare({
                                                ...selectedspare,
                                                sparePartOemNo: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="formGroup">
                                    <label>Spare Part Alternate No:</label>
                                    <input
                                        type="text"
                                        value={selectedspare.sparePartAlternateNo}
                                        onChange={(e) =>
                                            setSelectedspare({
                                                ...selectedspare,
                                                sparePartAlternateNo: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="formGroup">
                                    <label>Stock State:</label>
                                    <input
                                        type="text"
                                        value={selectedspare.stockState}
                                        onChange={(e) =>
                                            setSelectedspare({
                                                ...selectedspare,
                                                stockState: e.target.value,
                                            })
                                        }
                                    />
                                </div>


                            </form>
                            <div className="modalActions">
                                <button className="cancelButton" onClick={closeModal}>
                                    Cancel
                                </button>
                                <button className="addButton" onClick={handleAddspare}>
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Spares;