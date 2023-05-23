import { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Datatable from "../../components/datatable/Datatable";
import { useNavigate, createSearchParams } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { fetchbrands, updatebrand, createbrand, deletebrand} from "../../store/brand/brandSlice";
import { useDispatch, useSelector } from "react-redux";
import SingleBrand from "../single-brand/SingleBrand";

import { useLocation } from "react-router-dom";

import "./brand.scss";

const Brands = () => {
    const dispatch = useDispatch();
    const response = useSelector((state) => state.brand.brands);
    const status = useSelector((state) => state.brand.status);
    const error = useSelector((state) => state.brand.error);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedbrand, setSelectedbrand] = useState({
        brandName: "",
        brandImage: "",
    });

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchbrands());
    }, [dispatch]);

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    if (status === "failed") {
        return <div>Error: {error}</div>;
    }

    const openModal = (brand) => {
        setSelectedbrand({
            brandName: "",
            brandImage: "",
        });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleAddbrand = () => {
        dispatch(createbrand(selectedbrand));
        closeModal();
        window.location.reload();
    };

    const rows = [

        { field: "id", headerName: "ID", width: 70 },
        {
            field: "brandName",
            headerName: "Name",
            width: 230,
            renderCell: (response) => {
                return (
                    <div className="brandList">
                        <p>{response.row.brandName}</p>
                    </div>
                );
            },
        },
        {
            field: "brandImage",
            headerName: "Image",
            width: 230,
            renderCell: (response) => {
                return (
                    <div className="brandImage">
                        <img
                            src={response.row.brandImage}
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
        }
    ];

    const actionColumn = [
        {
            field: "action",
            headerName: "Action",
            width: 200,
            renderCell: (params) => {
                const handleEdit = () => {
                    navigate(`/brands/${params.row.id}`, { state: params.row });
                };

                const handleDelete = () => {
                    // ask the user if they are sure to delete the record
                    if (window.confirm("Are you sure to delete this brand?")) {
                        dispatch(deletebrand(params.row.id));
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
                        Add New Brand
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
                            <h2>Add brand</h2>
                            <form>
                                <div className="formGroup">
                                    <label>Name:</label>
                                    <input
                                        type="text"
                                        value={selectedbrand.brandName}
                                        onChange={(e) =>
                                            setSelectedbrand({
                                                ...selectedbrand,
                                                brandName: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="formGroup">
                                    <label>Image:</label>
                                    <input
                                        type="text"
                                        value={selectedbrand.brandImage}
                                        onChange={(e) =>
                                            setSelectedbrand({
                                                ...selectedbrand,
                                                brandImage: e.target.value,
                                            })
                                        }
                                    />
                                </div>

                            </form>
                            <div className="modalActions">
                                <button className="cancelButton" onClick={closeModal}>
                                    Cancel
                                </button>
                                <button className="addButton" onClick={handleAddbrand}>
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

export default Brands;