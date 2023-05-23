import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import {TextField, Button} from "@mui/material";
import {useLocation} from "react-router-dom";
import Box from '@mui/material/Box';

import {updateModel} from "../../store/model/modelSlice";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import { useNavigate} from "react-router-dom";
import { fetchModels } from "../../store/model/modelSlice";


const SingleModel = () => {

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const response = useSelector((state) => state.model.models);
  const status = useSelector((state) => state.model.status);
  const error = useSelector((state) => state.model.error);

  // filter the model by id
  const model = response.filter((model) => model.id === location.state.id)[0];

  // get the model data
  const [tId, setTId] = useState(model.tId);
  const [truckModelName, setTruckModelName] = useState(model.truckModelName);
  const [truckModelImage, setTruckModelImage] = useState(model.truckModelImage);

  const [loading, setLoading] = useState(false);


  const handleUpdate = () => {
      setLoading(true);
      console.log("Update model:", location.state);
      dispatch(updateModel({
          id: location.state.id,
          tId: tId,
          truckModelName: truckModelName,
          truckModelImage: truckModelImage,
      }));

      dispatch(fetchModels());

      setTimeout(() => {
          navigate('/models', {replace: true});
      }, 1000);
  };

    useEffect(() => {
        dispatch(fetchModels());
    }, [dispatch]);

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
          {loading ? (
              <div className="">
                  <h1 className="">
                      Updating model...
                  </h1>
              </div>
          ) : (
        <div className="top">
          <div className="left">
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src={model.truckModelImage}
                alt=""
                className="itemImg"
              />
              <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                  }}
                  noValidate
                  autoComplete="off"
              >
                <div>
                  <TextField
                      disabled
                      id="outlined-disabled"
                      label="ID"
                      defaultValue={model.id}
                  />
                    <TextField
                        disabled
                        id="outlined-disabled"
                        label="Truck ID"
                        defaultValue={model.tId}
                        onChange={(e) => setTId(e.target.value)}
                    />
                  <TextField
                      required
                      id="outlined-required"
                      label="Model Name"
                      defaultValue={model.truckModelName}
                      onChange={(e) => setTruckModelName(e.target.value)}
                  />
                    <TextField
                        required
                        id="outlined-required"
                        label="Model Image"
                        defaultValue={model.truckModelImage}
                        onChange={(e) => setTruckModelImage(e.target.value)}
                    />
                </div>

                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
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


export default SingleModel;
