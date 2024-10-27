import { LuSearch } from "react-icons/lu";
import "./Navbar.scss";
import { IoSettingsOutline } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { isSidebarCollapsed } from "../../Redux/collapse";
import { useNavigate } from "react-router-dom";
import { setSelected } from "../../Redux/Selected";
const Navbar = () => {
  const dispatch = useDispatch();
  const { isCollapsed } = useSelector((state) => state);
  const { selected } = useSelector((state) => state);
  const navigate = useNavigate();
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
        <span className="head">{selected.value}</span>
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
          <IconButton>
            <IoSettingsOutline
              style={{ fontSize: "25px", color: "gray", cursor: "pointer" }}
              onClick={() => {
                dispatch(setSelected("User Profile"));
                navigate("/Settings");
              }}
            />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
