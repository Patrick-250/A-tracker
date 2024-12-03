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

  const calculateNextTestDate = (testDate, assetType) => {
    const date = new Date(testDate);
    switch (assetType) {
      case "Bed":
        date.setMonth(date.getMonth() + 6);
        break;
      case "Power Strip":
        date.setMonth(date.getMonth() + 4);
        break;
      case "Medical Equipment":
        date.setMonth(date.getMonth() + 3);
        break;
      case "Electronic Appliances":
        date.setMonth(date.getMonth() + 8);
        break;
      default:
        break;
    }
    return date.toISOString().split("T")[0]; // Format as YYYY-MM-DD
  };

  const saveTestResults = async (testResults) => {
    const nextTestDate = calculateNextTestDate(testResults.date, assetType);
    const requestBody = {
      ...testResults,
      nextTestDate,
    };

    try {
      const response = await fetch(`/api/inventory/${assetId}/test-results`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      if (response.ok) {
        console.log("Test results saved successfully");
        fetchRecentTestHistory();
      } else {
        console.error("Error saving test results");
      }
    } catch (error) {
      console.error("Error saving test results:", error);
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
                <th>Continuity of Ground Tension</th>
                <th>Ampacity</th>
              </>
            )}
            {assetType === "Medical Equipment" && (
              <>
                <th>Asset Number</th>
                <th>Asset Location</th>
              </>
            )}
            <th>Next Test Date</th> {/* New column */}
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
                  <td>{test.continuityOfGroundTension}</td>
                  <td>{test.ampacity}</td>
                </>
              )}
              {assetType === "Medical Equipment" && (
                <>
                  <td>{test.assetNumber}</td>
                  <td>{test.assetLocation}</td>
                </>
              )}
              <td>{calculateNextTestDate(test.date, assetType)}</td>{" "}
              {/* New field */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TestHistory;