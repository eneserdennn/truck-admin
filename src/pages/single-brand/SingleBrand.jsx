import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import {TextField, Button} from "@mui/material";
import {useLocation} from "react-router-dom";
import Box from '@mui/material/Box';

import {updatebrand} from "../../store/brand/brandSlice";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import { useNavigate} from "react-router-dom";
import { fetchbrands } from "../../store/brand/brandSlice";


const SingleBrand = () => {

  const location = useLocation();
  const dispatch = useDispatch();
    const navigate = useNavigate();

  const response = useSelector((state) => state.brand.brands);
  const status = useSelector((state) => state.brand.status);
  const error = useSelector((state) => state.brand.error);

  // filter the brand by id
  const brand = response.filter((brand) => brand.id === location.state.id)[0];

  // get the brand data
  const [brandName, setbrandName] = useState(brand.brandName);
  const [brandImage, setbrandImage] = useState(brand.brandImage);

    const [loading, setLoading] = useState(false);



    const handleUpdate = () => {
      setLoading(true)
      console.log("Update brand:", location.state);
      dispatch(updatebrand({
          id: location.state.id,
          brandName: brandName,
          brandImage: brandImage,
      }));
        dispatch(fetchbrands());

      setTimeout(() => {
          navigate('/brands', {replace: true});
        }, 1000);
    };


    useEffect(() => {
        dispatch(fetchbrands());
    }, [dispatch]);

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
          {loading ? (
              <div className="">
                  <h1 className="">
                      Updating brand...
                  </h1>
              </div>
          ) : (
        <div className="top">
          <div className="left">
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src={brand.brandImage}
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
                      defaultValue={brand.id}
                  />
                  <TextField
                      required
                      id="outlined-required"
                      label="Brand Name"
                      defaultValue={brand.brandName}
                      onChange={(e) => setbrandName(e.target.value)}
                  />
                    <TextField
                        required
                        id="outlined-required"
                        label="Brand Image"
                        defaultValue={brand.brandImage}
                        onChange={(e) => setbrandImage(e.target.value)}
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


export default SingleBrand;



