import { LuSearch } from "react-icons/lu";
import "./Navbar.scss";
import { IoSettingsOutline } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import { IconButton, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { isSidebarCollapsed } from "../../Redux/collapse";
import { useNavigate } from "react-router-dom";
import { setSelected } from "../../Redux/Selected";
import { clearUser } from "../../Redux/auth";
import { FaRegBell } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import Badge from "@mui/material/Badge";
import { useState, useRef, useEffect } from "react";

const Navbar = ({ location }) => {
  const dispatch = useDispatch();
  const { isCollapsed } = useSelector((state) => state);
  const { selected } = useSelector((state) => state);
  const user = useSelector((state) => state.auth.user || { name: "Guest" }); // Provide fallback value
  const navigate = useNavigate();
  const hide = isCollapsed.collapsed;
  const [show, setShow] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    // console.log("User state updated:", user);
  }, [user]);

  const handleMouseEnter = () => {
    // Clear any existing timeout if the user re-enters
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setShow(true);
  };

  const handleMouseLeave = () => {
    // Set a timeout to hide tooltip after 1.5 seconds
    timeoutRef.current = setTimeout(() => {
      setShow(false);
    }, 1500);
  };

  const handleLogout = () => {
    // console.log("Logging out...");
    setShowSettings(false);
    setShowNotifications(false); // Hide notifications when logging out
    dispatch(clearUser()); // Clear user information
    // console.log("User after logout:", user); // Log user state after logout
    navigate("/login"); // Navigate to login page
  };

  const handleSettingsClick = () => {
    setShowSettings(true);
    setShowNotifications(false); // Hide notifications when settings are shown
    dispatch(setSelected("User Profile"));
    navigate("/settings");
  };

  const handleNotificationsClick = () => {
    setShowNotifications(true);
    setShowSettings(false); // Hide settings when notifications are shown
    dispatch(setSelected("Notifications"));
    navigate("/notifications"); // Navigate to notifications page
  };

  // Check if the current path is "/login"
  const isLoginPage = location.pathname === "/login";

  if (isLoginPage) {
    return null; // Return null to render nothing when on the login page
  }

  return (
    <div className="navbar" style={{ left: !hide ? "300px" : "80px" }}>
      {!showSettings && !showNotifications && (
        <>
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
            <hr className="hr" />
            <div className="profile">
              <IconButton
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <FaUserCircle
                  className="avator-placeholder"
                  style={{ fontSize: "50px", color: "#1e596e" }}
                />
              </IconButton>
              {/* popup */}
              {show && (
                <div
                  className="pop"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <span onClick={handleLogout}>
                    {user.name === "Guest" ? "Sign in" : "Sign out"}
                  </span>
                </div>
              )}
              {/* end of popup */}
              <span className="name">{user.name}</span>{" "}
              {/* Display current user's name */}
            </div>
          </div>
        </>
      )}
      {showSettings && (
        <div className="settings-content">
          <IconButton>
            <IoSettingsOutline
              style={{ fontSize: "25px", color: "gray", cursor: "pointer" }}
              onClick={() => {
                dispatch(setSelected("User Profile"));
                navigate("/settings");
              }}
            />
          </IconButton>
        </div>
      )}
      {showNotifications && (
        <div className="notifications-content">
          <IconButton>
            <Badge
              badgeContent={4}
              sx={{
                "& .MuiBadge-badge": {
                  backgroundColor: "red",
                  color: "white",
                  fontSize: "15px",
                },
                position: "absolute",
                top: 0,
                left: 0,
              }}
            >
              <FaRegBell />
            </Badge>
          </IconButton>
        </div>
      )}
    </div>
  );
};

export default Navbar;
