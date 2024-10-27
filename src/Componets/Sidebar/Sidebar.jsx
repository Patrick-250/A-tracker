import "./Sidebar.scss";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineDashboard } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { MdOutlineRssFeed } from "react-icons/md";
import { FaRegFlag } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { MdInventory2 } from "react-icons/md";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { useState } from "react";
import { setSelected } from "../../Redux/Selected";
import { useNavigate } from "react-router-dom";
const SidebarLink = {};
const Sidebar = () => {
  const { isCollapsed } = useSelector((state) => state);
  const hide = isCollapsed.collapsed;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const active = true;
  const [active, setActive] = useState("");
  return (
    <div className="sidebar" style={{ width: hide ? "58px" : "280px" }}>
      {/* Top logo */}
      <div className="logo">
        <span className="s-logo">logo</span>
        {!hide && <h1 className="h">QLI INVENTORY</h1>}
      </div>
      {/* liknks */}
      <div className="actions">
        <div
          className="btns-c"
          style={{
            backgroundColor: active === "dashboard" ? "rgb(155, 155, 248)" : "",
          }}
          onClick={() => {
            setActive("dashboard");
            dispatch(setSelected("Dashboard"));
            navigate("/");
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
            setActive("users");
            dispatch(setSelected("Inventory"));
          }}
          style={{
            backgroundColor: active === "users" ? "rgb(155, 155, 248)" : "",
          }}
        >
          <div className="btns">
            <MdInventory2
              fontSize={30}
              color={active === "users" ? "white" : "gray"}
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
                Inventory
              </span>
            )}
          </div>
          {/* <IoIosArrowForward color={active === "users" ? "white" : "gray"} /> */}
        </div>
        <div
          className="btns-c"
          style={{
            backgroundColor: active === "companies" ? "rgb(155, 155, 248)" : "",
          }}
          onClick={() => {
            setActive("companies");
            dispatch(setSelected("Products"));
          }}
        >
          <div className="btns">
            <AiOutlineShoppingCart
              fontSize={30}
              color={active === "companies" ? "white" : "gray"}
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
                Products
              </span>
            )}
          </div>
          {/* <IoIosArrowForward
            color={active === "companies" ? "white" : "gray"}
          /> */}
        </div>
        <div
          className="btns-c"
          onClick={() => {
            setActive("posts");
            dispatch(setSelected("Users"));
          }}
          style={{
            backgroundColor: active === "posts" ? "rgb(155, 155, 248)" : "",
          }}
        >
          <div className="btns">
            <HiOutlineUserGroup
              fontSize={30}
              color={active === "posts" ? "white" : "gray"}
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
                Users
              </span>
            )}
          </div>
          {/* <IoIosArrowForward color={active === "posts" ? "white" : "gray"} /> */}
        </div>
        <div
          className="btns-c"
          style={{
            backgroundColor: active === "content" ? "rgb(155, 155, 248)" : "",
            paddingRight: 0,
          }}
          onClick={() => {
            setActive("content");
            dispatch(setSelected("Expenses"));
          }}
        >
          <div
            className="btns"
            style={{
              width: "100%",
            }}
          >
            <RiMoneyDollarCircleLine
              fontSize={30}
              color={active === "content" ? "white" : "gray"}
            />
            {!hide && (
              <span
                style={{
                  color: active === "dashboard" ? "white" : "gray",
                  marginRight: 40,
                  fontSize: "20px",
                  color: "White",
                }}
              >
                Expenses
              </span>
            )}
          </div>
        </div>
      </div>
      {/* footer */}
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
            Copyrite QLI 2024
          </span>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
