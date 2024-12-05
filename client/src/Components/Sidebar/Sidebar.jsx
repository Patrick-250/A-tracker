import React from "react";
import "./Sidebar.scss";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineDashboard, MdInventory2 } from "react-icons/md";
import { BsQrCodeScan } from "react-icons/bs";
import { AiOutlineHome } from "react-icons/ai";
import { useState } from "react";
import { setSelected } from "../../Redux/Selected";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/logoQLI.png"; // Adjust the path as necessary

const Sidebar = () => {
  const { isCollapsed } = useSelector((state) => state);
  const hide = isCollapsed.collapsed;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // Get the current path
  const [active, setActive] = useState("home");

  // Check if the current path is "/login"
  const isLoginPage = location.pathname === "/login";

  if (isLoginPage) {
    return null; // Return null to render nothing when on the login page
  }

  return (
    <div className="sidebar" style={{ width: hide ? "58px" : "280px" }}>
      {/* Top logo */}
      <div className="logo">
        <img src={logo} alt="Logo" className="s-logo" />
        {!hide && <h1 className="h">A-Tracker</h1>}
      </div>
      {/* Links */}
      <div className="actions">
        <div
          className="btns-c"
          style={{
            backgroundColor: active === "home" ? "#449aba" : "",
            display: hide ? "flex" : "",
            alignItems: hide ? "center" : "",
            justifyContent: hide ? "center" : "",
          }}
          onClick={() => {
            setActive("home");
            dispatch(setSelected("Home"));
            navigate("/");
          }}
        >
          <div className="btns">
            <AiOutlineHome
              fontSize={30}
              color={active === "home" ? "white" : "gray"}
            />
            {!hide && (
              <span
                style={{
                  color: active === "home" ? "white" : "gray",
                  marginRight: 40,
                  fontSize: "20px",
                  color: "white",
                }}
              >
                Home
              </span>
            )}
          </div>
        </div>
        <div
          className="btns-c"
          style={{
            backgroundColor: active === "dashboard" ? "#449aba" : "",
            display: hide ? "flex" : "",
            alignItems: hide ? "center" : "",
            justifyContent: hide ? "center" : "",
          }}
          onClick={() => {
            setActive("dashboard");
            dispatch(setSelected("Dashboard"));
            navigate("/dashboard");
          }}
        >
          <div className="btns">
            <MdOutlineDashboard
              fontSize={30}
              color={active === "dashboard" ? "white" : "gray"}
            />
            {!hide && (
              <span
                style={{
                  color: active === "dashboard" ? "white" : "gray",
                  marginRight: 40,
                  fontSize: "20px",
                  color: "white",
                }}
              >
                Dashboard
              </span>
            )}
          </div>
        </div>
        <div
          className="btns-c"
          onClick={() => {
            setActive("inventory");
            dispatch(setSelected("Inventory"));
            navigate("/inventory");
          }}
          style={{
            backgroundColor: active === "inventory" ? "#449aba" : "",
            display: hide ? "flex" : "",
            alignItems: hide ? "center" : "",
            justifyContent: hide ? "center" : "",
          }}
        >
          <div className="btns">
            <MdInventory2
              fontSize={30}
              color={active === "inventory" ? "white" : "gray"}
            />
            {!hide && (
              <span
                style={{
                  color: active === "inventory" ? "white" : "gray",
                  marginRight: 40,
                  fontSize: "20px",
                  color: "white",
                }}
              >
                Inventory
              </span>
            )}
          </div>
        </div>
        <div
          className="btns-c"
          onClick={() => {
            setActive("scan");
            dispatch(setSelected("Scan Product"));
            navigate("/scan-asset");
          }}
          style={{
            backgroundColor: active === "scan" ? "#449aba" : "",
            display: hide ? "flex" : "",
            alignItems: hide ? "center" : "",
            justifyContent: hide ? "center" : "",
          }}
        >
          <div className="btns">
            <BsQrCodeScan
              fontSize={30}
              color={active === "scan" ? "white" : "gray"}
            />
            {!hide && (
              <span
                style={{
                  color: active === "scan" ? "white" : "gray",
                  marginRight: 40,
                  fontSize: "20px",
                  color: "white",
                }}
              >
                Scan
              </span>
            )}
          </div>
        </div>
      </div>
      {/* Footer */}
      <div
        className="footer"
        style={{ alignSelf: "flex-end", marginTop: "150px" }}
      >
        {!hide && (
          <span
            style={{
              color: active === "dashboard" ? "#fdb913" : "#ffe6b9",
              marginRight: 40,
              fontSize: "15px",
            }}
          >
            Copyright QLI 2024
          </span>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
