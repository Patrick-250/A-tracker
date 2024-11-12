import React from "react";
import "./Card.scss";
import { FaBed, FaPlug, FaStethoscope, FaTv, FaTools } from "react-icons/fa";

const Card = ({
  totalBeds,
  totalPowerStrips,
  totalMedicalEquipment,
  totalElectronicAppliances,
  totalUpcomingMaintenance,
  totalAssets,
  onCardClick,
}) => {
  const calculatePercentage = (count) =>
    ((count / totalAssets) * 100).toFixed(2);

  return (
    <div className="card-container">
      <div
        className="card"
        style={{ backgroundColor: "rgb(255, 235, 235)" }}
        onClick={() => onCardClick("Bed")}
      >
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
              {totalBeds}
            </span>
            <span style={{ fontSize: 13, color: "gray" }}>
              {calculatePercentage(totalBeds)}% of total assets
            </span>
          </div>
          <div className="icon">
            <FaBed size={25} color="red" />
          </div>
        </div>
      </div>
      <div
        className="card"
        style={{ backgroundColor: "rgb(235, 255, 235)" }}
        onClick={() => onCardClick("Power Strip")}
      >
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
              {totalPowerStrips}
            </span>
            <span style={{ fontSize: 13, color: "gray" }}>
              {calculatePercentage(totalPowerStrips)}% of total assets
            </span>
          </div>
          <div className="icon">
            <FaPlug size={25} color="green" />
          </div>
        </div>
      </div>
      <div
        className="card"
        style={{ backgroundColor: "rgb(235, 235, 255)" }}
        onClick={() => onCardClick("Medical Equipment")}
      >
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
              {totalMedicalEquipment}
            </span>
            <span style={{ fontSize: 13, color: "gray" }}>
              {calculatePercentage(totalMedicalEquipment)}% of total assets
            </span>
          </div>
          <div className="icon">
            <FaStethoscope size={25} color="blue" />
          </div>
        </div>
      </div>
      <div
        className="card"
        style={{ backgroundColor: "rgb(255, 255, 235)" }}
        onClick={() => onCardClick("Electronic Appliances")}
      >
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
              {totalElectronicAppliances}
            </span>
            <span style={{ fontSize: 13, color: "gray" }}>
              {calculatePercentage(totalElectronicAppliances)}% of total assets
            </span>
          </div>
          <div className="icon">
            <FaTv size={25} color="green" />
          </div>
        </div>
      </div>
      <div
        className="card"
        style={{ backgroundColor: "rgb(255, 245, 235)" }}
        onClick={() => onCardClick("Upcoming Maintenance")}
      >
        <div className="users">
          <div className="nums">
            <span style={{ color: "gray" }}>Upcoming Maintenance</span>
            <span
              style={{
                fontWeight: "bold",
                fontSize: 22,
                marginTop: 15,
              }}
            >
              {totalUpcomingMaintenance}
            </span>
            <span style={{ fontSize: 13, color: "gray" }}>
              {calculatePercentage(totalUpcomingMaintenance)}% of total assets
            </span>
          </div>
          <div className="icon">
            <FaTools size={25} color="orange" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
