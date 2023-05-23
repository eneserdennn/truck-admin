import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import {Link} from "react-router-dom";
import {DarkModeContext} from "../../context/darkModeContext";
import {useContext} from "react";

const Sidebar = () => {
    const {dispatch} = useContext(DarkModeContext);
    return (
        <div className="sidebar">
            <div className="top">
                <Link to="/" style={{textDecoration: "none"}}>
                    <span className="logo">Admin Dashboard</span>
                </Link>
            </div>
            <hr/>
            <div className="center">
                <ul>
                    <p className="title">MAIN</p>
                    <li>
                        <DashboardIcon className="icon"/>
                        <span>Dashboard</span>
                    </li>

                    <p className="title">TRUCK</p>
                    <Link to="/brands" style={{textDecoration: "none"}}>
                        <li>
                            <PersonOutlineIcon className="icon"/>
                            <span>Brands</span>
                        </li>
                    </Link>
                    <Link to="/models" style={{textDecoration: "none"}}>
                        <li>
                            <PersonOutlineIcon className="icon"/>
                            <span>Models</span>
                        </li>
                    </Link>

                    <Link to="/spares" style={{textDecoration: "none"}}>
                        <li>
                            <PersonOutlineIcon className="icon"/>
                            <span>Spares</span>
                        </li>
                    </Link>
                </ul>
            </div>
            <div className="bottom">
                <div
                    className="colorOption"
                    onClick={() => dispatch({type: "LIGHT"})}
                ></div>
                <div
                    className="colorOption"
                    onClick={() => dispatch({type: "DARK"})}
                ></div>
            </div>
        </div>
    );
};

export default Sidebar;
