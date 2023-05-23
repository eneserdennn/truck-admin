import { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Datatable from "../../components/datatable/Datatable";
import { useNavigate, createSearchParams } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { fetchModels, createModel, deleteModel } from "../../store/model/modelSlice";
import { useDispatch, useSelector } from "react-redux";
import SingleModel from "../single-model/SingleModel";

import { useLocation } from "react-router-dom";

import "./modal.scss";

const Models = () => {
    const dispatch = useDispatch();
    const response = useSelector((state) => state.model.models);
    const status = useSelector((state) => state.model.status);
    const error = useSelector((state) => state.model.error);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedModel, setSelectedModel] = useState({
        truckModelName: "",
        truckModelImage: "",
        tId: "",
    });

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchModels());
    }, [dispatch]);

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    if (status === "failed") {
        return <div>Error: {error}</div>;
    }

    const openModal = () => {
        setSelectedModel({
            truckModelName: "",
            truckModelImage: "",
            tId: "",
        });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleAddModel = () => {
        dispatch(createModel(selectedModel));
        closeModal();
        window.location.reload();
    };

    const rows = [

        { field: "id", headerName: "ID", width: 70 },
        {
            field: "modelName",
            headerName: "Name",
            width: 230,
            renderCell: (response) => {
                return (
                    <div className="modelList">
                        <p>{response.row.truckModelName}</p>
                    </div>
                );
            },
        },
        {
            field: "modelImage",
            headerName: "Image",
            width: 230,
            renderCell: (response) => {
                return (
                    <div className="modeImage">
                        <img
                            src={response.row.truckModelImage}
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
            headerName: "Truck ID",
            width: 230,
            renderCell: (response) => {
                return (
                    <div className="modelList">
                        <p>{response.row.tId}</p>
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
                    navigate(`/models/${params.row.id}`, { state: params.row });
                };

                const handleDelete = () => {
                    // ask the user if they are sure to delete the record
                    if (window.confirm("Are you sure to delete this model?")) {
                        dispatch(deleteModel(params.row.id));
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
            <Sidebar />
            <div className="listContainer">
                <Navbar />
                <div className="datatable">
                    <div className="datatableTitle">
                        Add New Model
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
                            <h2>Add Model</h2>
                            <form>
                                <div className="formGroup">
                                    <label>Name:</label>
                                    <input
                                        type="text"
                                        value={selectedModel.truckModelName}
                                        onChange={(e) =>
                                            setSelectedModel({
                                                ...selectedModel,
                                                truckModelName: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="formGroup">
                                    <label>Image:</label>
                                    <input
                                        type="text"
                                        value={selectedModel.truckModelImage}
                                        onChange={(e) =>
                                            setSelectedModel({
                                                ...selectedModel,
                                                truckModelImage: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="formGroup">
                                    <label>Truck ID:</label>
                                    <input
                                        type="text"
                                        value={selectedModel.tId}
                                        onChange={(e) =>
                                            setSelectedModel({
                                                ...selectedModel,
                                                tId: e.target.value,
                                            })
                                        }
                                    />
                                </div>

                            </form>
                            <div className="modalActions">
                                <button className="cancelButton" onClick={closeModal}>
                                    Cancel
                                </button>
                                <button className="addButton" onClick={handleAddModel}>
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

export default Models;