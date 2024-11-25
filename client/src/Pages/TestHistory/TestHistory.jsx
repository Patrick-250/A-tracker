import React, { useState, useEffect } from "react";
import "./TestHistory.css";

const TestHistory = ({ assetId, assetType }) => {
  const [testHistory, setTestHistory] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetchRecentTestHistory();
  }, [assetId]);

  const fetchRecentTestHistory = async () => {
    try {
      const response = await fetch(
        `/api/inventory/${assetId}/test-history/recent`
      );
      const data = await response.json();
      setTestHistory(data);
    } catch (error) {
      console.error("Error fetching recent test history:", error);
    }
  };

  const fetchAllTestHistory = async () => {
    try {
      const response = await fetch(
        `/api/inventory/${assetId}/test-history/all`
      );
      const data = await response.json();
      setTestHistory(data);
      setShowAll(true);
    } catch (error) {
      console.error("Error fetching all test history:", error);
    }
  };

  return (
    <div className="test-history">
      <h2>Test History</h2>
      <button onClick={fetchRecentTestHistory}>Show Recent Tests</button>
      <button onClick={fetchAllTestHistory}>See More Tests</button>
      <table className="test-history-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Cord Integrity</th>
            {assetType === "Bed" && (
              <>
                <th>Ground Wire Resistance</th>
                <th>Ground Leakage Current</th>
                <th>Chassis Touch Current</th>
              </>
            )}
            {assetType === "Power Strip" && (
              <>
                <th>Physical Integrity</th>
                <th>Polarity</th>
                <th>Continuity of Ground Tension</th> {/* New field */}
                <th>Ampacity</th>
              </>
            )}
            {assetType === "Medical Equipment" && (
              <>
                <th>Asset Number</th>
                <th>Asset Location</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {testHistory.map((test, index) => (
            <tr key={index}>
              <td>{test.date}</td>
              <td>{test.cordIntegrity}</td>
              {assetType === "Bed" && (
                <>
                  <td>{test.groundWireResistance}</td>
                  <td>{test.groundLeakageCurrent}</td>
                  <td>{test.chassisTouchCurrent}</td>
                </>
              )}
              {assetType === "Power Strip" && (
                <>
                  <td>{test.physicalIntegrity}</td>
                  <td>{test.polarity}</td>
                  <td>{test.continuityOfGroundTension}</td> {/* New field */}
                  <td>{test.ampacity}</td>
                </>
              )}
              {assetType === "Medical Equipment" && (
                <>
                  <td>{test.assetNumber}</td>
                  <td>{test.assetLocation}</td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TestHistory;
