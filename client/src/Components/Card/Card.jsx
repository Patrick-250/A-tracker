import React, { useState } from "react";
import "./Card.scss";
import { IoTrendingUp } from "react-icons/io5";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { TiShoppingCart } from "react-icons/ti";
import { FaBed, FaPlug, FaStethoscope, FaTv } from "react-icons/fa"; // Import new icons

const Card = () => {
  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardClick = (cardType) => {
    setSelectedCard(cardType);
  };

  const renderContent = () => {
    switch (selectedCard) {
      case "Total Assets":
        return (
          <div>
            here, i will display the Total Assets content, fetched from the
            backend{" "}
          </div>
        );
      case "Beds":
        return (
          <div>
            here i will display total Beds Content,fetched from the backend
          </div>
        );
      case "Power Strips":
        return (
          <div>
            here i will display total Power Strips Content,fetched from the
            backend
          </div>
        );
      case "Medical Equipment":
        return (
          <div>
            here i will display the total Medical Equipment Content,fetched from
            the backend
          </div>
        );
      case "Electronic Appliances":
        return (
          <div>
            here i will display the Electronic Appliances Content,fetched from
            the backend
          </div>
        );
      default:
        return <div>Select a card to view content</div>;
    }
  };

  return (
    <div>
      {!selectedCard ? (
        <div className="card-container">
          <div
            className="card"
            style={{ background: "rgb(246, 246, 255)" }}
            onClick={() => handleCardClick("Total Assets")}
          >
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
          <div
            className="card"
            style={{ backgroundColor: "rgb(255, 235, 235)" }}
            onClick={() => handleCardClick("Beds")}
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
                  120
                </span>
                <span style={{ fontSize: 13, color: "gray" }}>
                  10% of total assets
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
            onClick={() => handleCardClick("Power Strips")}
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
                  300
                </span>
                <span style={{ fontSize: 13, color: "gray" }}>
                  40% of total assets
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
            onClick={() => handleCardClick("Medical Equipment")}
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
                  75
                </span>
                <span style={{ fontSize: 13, color: "gray" }}>
                  5% of total assets
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
            onClick={() => handleCardClick("Electronic Appliances")}
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
                  50
                </span>
                <span style={{ fontSize: 13, color: "gray" }}>
                  15% of total assets
                </span>
              </div>
              <div className="icon">
                <FaTv size={25} color="green" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="card-content">
          {renderContent()}
          <button
            onClick={() => setSelectedCard(null)}
            style={{ cursor: "pointer" }}
          >
            Back
          </button>
        </div>
      )}
    </div>
  );
};

export default Card;
