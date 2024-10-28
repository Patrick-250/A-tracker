import React from "react";
import "./Card.scss";
import { IoTrendingUp } from "react-icons/io5";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { TiShoppingCart } from "react-icons/ti";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import { TbCategory } from "react-icons/tb";
import { FaBed, FaPlug, FaStethoscope, FaTv } from "react-icons/fa"; // Import new icons

const Card = () => {
  return (
    <div className="card-container">
      <div className="card" style={{ backgroundColor: "rgb(225, 225, 248)" }}>
        <div className="users">
          <div className="nums">
            <span style={{ color: "gray" }}>Total Stock Value</span>
            <span
              style={{
                fontWeight: "bold",
                fontSize: 22,
                marginTop: 15,
              }}
            >
              150,000$
            </span>
          </div>
          <div className="icon">
            <RiMoneyDollarCircleFill size={25} color="blue" />
          </div>
        </div>
        <div className="count">
          <IoTrendingUp size={17} />
          <span style={{ fontSize: 13 }}>100%</span>
          <span style={{ fontSize: 13 }}>available stock</span>
        </div>
      </div>
      <div className="card" style={{ background: "rgb(246, 246, 255)" }}>
        <div className="users">
          <div className="nums">
            <span style={{ color: "gray" }}>Total Assets</span>
            <span
              style={{
                fontWeight: "bold",
                fontSize: 22,
                marginTop: 15,
              }}
            >
              4590
            </span>
          </div>
          <div
            className="icon"
            style={{ backgroundColor: "rgb(235, 241, 199)" }}
          >
            <TiShoppingCart size={25} color="rgb(81, 230, 36)" />
          </div>
        </div>
        <div className="count">
          <IoTrendingUp size={17} />
          <span style={{ fontSize: 13 }}>30%</span>
          <span style={{ fontSize: 13 }}>in the last 4 days</span>
        </div>
      </div>
      <div className="card" style={{ backgroundColor: "rgb(244, 251, 215)" }}>
        <div className="users">
          <div className="nums">
            <span style={{ color: "gray" }}>Out of order</span>
            <span
              style={{
                fontWeight: "bold",
                fontSize: 22,
                marginTop: 15,
              }}
            >
              0
            </span>
          </div>
          <div
            className="icon"
            style={{ backgroundColor: "rgba(192, 252, 187, 0.869)" }}
          >
            <MdOutlineRemoveShoppingCart size={25} color="green" />
          </div>
        </div>
      </div>
      <div className="card" style={{ backgroundColor: " rgb(230, 252, 224)" }}>
        <div className="users">
          <div className="nums">
            <span style={{ color: "gray" }}>All Categories</span>
            <span
              style={{
                fontWeight: "bold",
                fontSize: 22,
                marginTop: 15,
              }}
            >
              4
            </span>
          </div>
          <div className="icon" style={{ backgroundColor: "#9af591de" }}>
            <TbCategory size={25} color="gray" />
          </div>
        </div>
      </div>
      <div className="card" style={{ backgroundColor: "rgb(255, 235, 235)" }}>
        <div className="users">
          <div className="nums">
            <span style={{ color: "gray" }}>Beds</span>
            <span
              style={{
                fontWeight: "bold",
                fontSize: 22,
                marginTop: 15,
              }}
            >
              120
            </span>
          </div>
          <div className="icon">
            <FaBed size={25} color="red" />
          </div>
        </div>
      </div>
      <div className="card" style={{ backgroundColor: "rgb(235, 255, 235)" }}>
        <div className="users">
          <div className="nums">
            <span style={{ color: "gray" }}>Power Strips</span>
            <span
              style={{
                fontWeight: "bold",
                fontSize: 22,
                marginTop: 15,
              }}
            >
              300
            </span>
          </div>
          <div className="icon">
            <FaPlug size={25} color="green" />
          </div>
        </div>
      </div>
      <div className="card" style={{ backgroundColor: "rgb(235, 235, 255)" }}>
        <div className="users">
          <div className="nums">
            <span style={{ color: "gray" }}>Medical Equipment</span>
            <span
              style={{
                fontWeight: "bold",
                fontSize: 22,
                marginTop: 15,
              }}
            >
              75
            </span>
          </div>
          <div className="icon">
            <FaStethoscope size={25} color="blue" />
          </div>
        </div>
      </div>
      <div className="card" style={{ backgroundColor: "rgb(255, 255, 235)" }}>
        <div className="users">
          <div className="nums">
            <span style={{ color: "gray" }}>Electronic Appliances</span>
            <span
              style={{
                fontWeight: "bold",
                fontSize: 22,
                marginTop: 15,
              }}
            >
              50
            </span>
          </div>
          <div className="icon">
            <FaTv size={25} color="yellow" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
