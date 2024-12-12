import React, { useState } from "react";
import "./Test.css"; // Import the CSS file

const Test = ({ asset, saveTestResults, handleCancel }) => {
  const [testResults, setTestResults] = useState({
    date: asset.date,
    cordIntegrity: asset.cordIntegrity,
    groundWireResistance: asset.groundWireResistance,
    groundLeakageCurrent: asset.groundLeakageCurrent,
    chassisTouchCurrent: asset.chassisTouchCurrent,
    physicalIntegrity: asset.physicalIntegrity,
    polarity: asset.polarity,
    continuityOfGroundTension: asset.continuityOfGroundTension, // New field
    ampacity: asset.ampacity,
  });

  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(`Input change - ${name}: ${value}`);
    setTestResults({ ...testResults, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting test results:", testResults);
    saveTestResults(asset.id, testResults);
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 3000); // Hide the message after 3 seconds
  };

  return (
    <div>
      <h2>Test Asset</h2>
      {isSuccess && (
        <div className="success-message">Test results saved successfully!</div>
      )}
      <form onSubmit={handleSubmit}>
        <label>
          Date:
          <input
            type="date"
            name="date"
            value={testResults.date}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Cord Integrity:
          <input
            type="text"
            name="cordIntegrity"
            value={testResults.cordIntegrity}
            onChange={handleInputChange}
          />
        </label>
        {asset.type === "Bed" && (
          <>
            <label>
              Ground Wire Resistance:
              <input
                type="text"
                name="groundWireResistance"
                value={testResults.groundWireResistance}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Ground Leakage Current:
              <input
                type="text"
                name="groundLeakageCurrent"
                value={testResults.groundLeakageCurrent}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Chassis Touch Current:
              <input
                type="text"
                name="chassisTouchCurrent"
                value={testResults.chassisTouchCurrent}
                onChange={handleInputChange}
              />
            </label>
          </>
        )}
        {asset.type === "Power Strip" && (
          <>
            <label>
              Physical Integrity:
              <input
                type="text"
                name="physicalIntegrity"
                value={testResults.physicalIntegrity}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Polarity:
              <input
                type="text"
                name="polarity"
                value={testResults.polarity}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Continuity of Ground Tension:
              <input
                type="text"
                name="continuityOfGroundTension"
                value={testResults.continuityOfGroundTension}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Ampacity:
              <input
                type="text"
                name="ampacity"
                value={testResults.ampacity}
                onChange={handleInputChange}
              />
            </label>
          </>
        )}
        <div className="button-container">
          <button
            className="save-test"
            type="submit"
            style={{ backgroundColor: "#30638e" }}
          >
            Save Test
          </button>
          <button className="cancel" type="button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Test;
