import "./Sidebar.scss";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineDashboard, MdInventory2 } from "react-icons/md";
import { BsQrCodeScan } from "react-icons/bs";
import { VscReport } from "react-icons/vsc";
import { AiOutlineHome } from "react-icons/ai"; // Import Home icon
import { useState } from "react";
import { setSelected } from "../../Redux/Selected";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const { isCollapsed } = useSelector((state) => state);
  const hide = isCollapsed.collapsed;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [active, setActive] = useState("home");

  return (
    <div className="sidebar" style={{ width: hide ? "58px" : "280px" }}>
      {/* Top logo */}
      <div className="logo">
        <span className="s-logo">logo</span>
        {!hide && <h1 className="h">QLI A-Tracker</h1>}
      </div>
      {/* Links */}
      <div className="actions">
        <div
          className="btns-c"
          style={{
            backgroundColor: active === "home" ? "rgb(155, 155, 248)" : "",
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
            backgroundColor: active === "dashboard" ? "rgb(155, 155, 248)" : "",
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
            backgroundColor: active === "inventory" ? "rgb(155, 155, 248)" : "",
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
            backgroundColor: active === "scan" ? "rgb(155, 155, 248)" : "",
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
        <div
          className="btns-c"
          style={{
            backgroundColor: active === "content" ? "rgb(155, 155, 248)" : "",
            // paddingRight: 0,
            display: hide ? "flex" : "",
            alignItems: hide ? "center" : "",
            justifyContent: hide ? "center" : "",
          }}
          onClick={() => {
            setActive("content");
            dispatch(setSelected("Report a bug"));
            navigate("/report-bug");
          }}
        >
          <div
            className="btns"
            style={{
              width: "100%",
            }}
          >
            <VscReport
              fontSize={30}
              color={active === "content" ? "white" : "gray"}
            />
            {!hide && (
              <span
                style={{
                  color: active === "content" ? "white" : "gray",
                  marginRight: 40,
                  fontSize: "20px",
                  color: "White",
                }}
              >
                Report a bug
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
              color: active === "dashboard" ? "white" : "gray",
              marginRight: 40,
              fontSize: "15px",
              color: "gray",
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
