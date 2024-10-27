import { LuSearch } from "react-icons/lu";
import "./Navbar.scss";
import { IoSettingsOutline } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { isSidebarCollapsed } from "../../Redux/collapse";
const Navbar = () => {
  const dispatch = useDispatch();
  const { isCollapsed } = useSelector((state) => state);
  const hide = isCollapsed.collapsed;
  return (
    <div className="navbar" style={{ left: !hide ? "300px" : "80px" }}>
      <div className="left">
        <IconButton
          onClick={() => {
            dispatch(isSidebarCollapsed(!isCollapsed.collapsed));
          }}
        >
          <GiHamburgerMenu />
        </IconButton>
        <span className="head">Dashbord</span>
      </div>
      <div className="middle">
        <div className="input">
          <LuSearch style={{ fontSize: "25px", color: "gray" }} />
          <div className="search">
            <input
              type="text"
              className="s"
              placeholder="search inventory..."
            />
          </div>
        </div>
        <hr className="hr" />
        <div className="profile">
          <img src="/images/pic.jpg" alt="" className="avator" />
          <span className="name">Patrick T</span>
          <Link path={"/Settings"}>
            <IoSettingsOutline
              style={{ fontSize: "25px", color: "gray", cursor: "pointer" }}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
