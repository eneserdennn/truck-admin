import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import {TextField, Button} from "@mui/material";
import {useLocation} from "react-router-dom";
import Box from '@mui/material/Box';

import {updatespare} from "../../store/spare/spareSlice";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {fetchspares} from "../../store/spare/spareSlice";


const SingleSpare = () => {

    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const response = useSelector((state) => state.spare.spares);
    const status = useSelector((state) => state.spare.status);
    const error = useSelector((state) => state.spare.error);

    // filter the spare by id
    const spare = response.filter((spare) => spare.id === location.state.id)[0];

    // get the spare data
    const [modelId, setmodelId] = useState(spare.modelId);
    const [sparePartName, setsparePartName] = useState(spare.sparePartName);
    const [sparePartImage, setsparePartImage] = useState(spare.sparePartImage);
    const [sparePartOemNo, setsparePartOemNo] = useState(spare.sparePartOemNo);
    const [sparePartAlternateNo, setsparePartAlternateNo] = useState(spare.sparePartAlternateNo);
    const [stockState, setstockState] = useState(spare.stockState);

    const [loading, setLoading] = useState(false);
    const handleUpdate = () => {
        // Update logic here
        setLoading(true);
        console.log("Update spare:", location.state);
        dispatch(updatespare({
            id: location.state.id,
            modelId: modelId,
            sparePartName: sparePartName,
            sparePartImage: sparePartImage,
            sparePartOemNo: sparePartOemNo,
            sparePartAlternateNo: sparePartAlternateNo,
            stockState: stockState,
        }));

        dispatch(fetchspares());

        setTimeout(() => {
            navigate('/spares', {replace: true});
        }, 1000);

    };

    useEffect(() => {
        dispatch(fetchspares());
    }, [dispatch]);


    return (
        <div className="single">
            <Sidebar/>
            <div className="singleContainer">
                <Navbar/>
                {loading ? (
                    <div className="">
                        <h1 className="">
                            Updating spare...
                        </h1>
                    </div>
                ) : (
                    <div className="top">
                        <div className="left">
                            <h1 className="title">Information</h1>
                            <div className="item">
                                <img
                                    src={spare.sparePartImage}
                                    alt=""
                                    className="itemImg"
                                />
                                <Box
                                    component="form"
                                    sx={{
                                        '& .MuiTextField-root': {m: 1, width: '25ch'},
                                    }}
                                    noValidate
                                    autoComplete="off"
                                >
                                    <div>
                                        <TextField
                                            disabled
                                            id="outlined-disabled"
                                            label="ID"
                                            defaultValue={spare.id}
                                        />
                                        <TextField
                                            disabled
                                            id="outlined-disabled"
                                            label="Model ID"
                                            defaultValue={spare.modelId}
                                            onChange={(e) => setmodelId(e.target.value)}
                                        />
                                        <TextField
                                            required
                                            id="outlined-required"
                                            label="spare Name"
                                            defaultValue={spare.sparePartName}
                                            onChange={(e) => setsparePartName(e.target.value)}
                                        />
                                        <TextField
                                            required
                                            id="outlined-required"
                                            label="spare Image"
                                            defaultValue={spare.sparePartImage}
                                            onChange={(e) => setsparePartImage(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <TextField
                                            required
                                            id="outlined-required"
                                            label="spare OEM No"
                                            defaultValue={spare.sparePartOemNo}
                                            onChange={(e) => setsparePartOemNo(e.target.value)}
                                        />
                                        <TextField
                                            required
                                            id="outlined-required"
                                            label="spare Alternate No"
                                            defaultValue={spare.sparePartAlternateNo}
                                            onChange={(e) => setsparePartAlternateNo(e.target.value)}
                                        />
                                        <TextField
                                            required
                                            id="outlined-required"
                                            label="Stock State"
                                            defaultValue={spare.stockState}
                                            onChange={(e) => setstockState(e.target.value)}
                                        />
                                    </div>

                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between'
                                    }}>
                                        <Button variant="contained" onClick={handleUpdate}>Update</Button>
                                    </div>
                                </Box>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};


export default SingleSpare;
