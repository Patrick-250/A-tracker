import "./Sidebar.scss";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineDashboard } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { MdOutlineRssFeed } from "react-icons/md";
import { FaRegFlag } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
const SidebarLink = {};
const Sidebar = () => {
  const { isCollapsed } = useSelector((state) => state);
  const hide = isCollapsed.collapsed;
  const active = true;
  return (
    <div className="sidebar" style={{ width: hide ? "58px" : "280px" }}>
      {/* Top logo */}
      <div className="logo">
        <span className="s-logo">logo</span>
        {!hide && <h1 className="h">QLI INVENTORY</h1>}
      </div>
      {/* liknks */}{" "}
      <div className="actions">
        <div
          className="btns-c"
          style={{
            backgroundColor: active === "dashboard" ? "blue" : "",
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
            dispatch(setSelected("Users"));
          }}
          style={{
            backgroundColor: active === "users" ? "blue" : "",
          }}
        >
          <div className="btns">
            <HiOutlineUserGroup
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
            backgroundColor: active === "companies" ? "blue" : "",
          }}
          onClick={() => {
            setActive("companies");
            dispatch(setSelected("Companies"));
          }}
        >
          <div className="btns">
            <HiOutlineUserGroup
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
            dispatch(setSelected("Posts"));
          }}
          style={{
            backgroundColor: active === "posts" ? "blue" : "",
          }}
        >
          <div className="btns">
            <MdOutlineRssFeed
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
            backgroundColor: active === "content" ? "blue" : "",
            paddingRight: 0,
          }}
          onClick={() => {
            setActive("content");
            dispatch(setSelected("Content Moderation"));
          }}
        >
          <div
            className="btns"
            style={{
              width: "100%",
            }}
          >
            <FaRegFlag
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
                Moderation
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
