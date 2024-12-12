import React, { useState, useEffect } from "react";
import axios from "axios";
import TestHistory from "../TestHistory/TestHistory";
import Test from "../Test/Test";
import AssetForm from "../AssetForm/AssetForm"; // Import the AssetForm component
import "./ScanAsset.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

console.log("API_BASE_URL:", API_BASE_URL); // Debugging statement

const ScanAsset = () => {
  const [scannedAsset, setScannedAsset] = useState(null);
  const [barcode, setBarcode] = useState("");
  const [editingAsset, setEditingAsset] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showTestHistory, setShowTestHistory] = useState(false);
  const [showTests, setShowTests] = useState(false);
  const [manageAssetId, setManageAssetId] = useState(null);
  const [selectedType, setSelectedType] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAsset, setNewAsset] = useState({
    type: "",
    date: "",
    assetNumber: "",
    assetName: "",
    assetLocation: "",
    cordIntegrity: "Pass",
    groundWireResistance: "",
    groundLeakageCurrent: "",
    chassisTouchCurrent: "",
    physicalIntegrity: "",
    polarity: "",
    continuityOfGroundTension: "", // New field
    ampacity: "",
  });

  useEffect(() => {
    let barcodeBuffer = "";

    const handleKeyPress = (event) => {
      console.log("Key pressed:", event.key); // Debugging statement
      if (event.key === "Enter") {
        console.log("Barcode scanned:", barcodeBuffer); // Debugging statement
        fetchAssetDetails(barcodeBuffer);
        barcodeBuffer = ""; // Reset barcode buffer after processing
      } else {
        barcodeBuffer += event.key;
      }
    };

    window.addEventListener("keypress", handleKeyPress);
    return () => {
      window.removeEventListener("keypress", handleKeyPress);
    };
  }, []);

  const fetchAssetDetails = async (barcode) => {
    try {
      const url = `${API_BASE_URL}/inventory/asset?assetNumber=${barcode}`;
      console.log("Fetching asset details for barcode:", barcode); // Debugging statement
      console.log("Request URL:", url); // Debugging statement
      const response = await axios.get(url);
      console.log("Response received:", response); // Debugging statement

      // Check if the response is JSON
      if (
        response.headers["content-type"] &&
        response.headers["content-type"].includes("application/json")
      ) {
        const data = response.data;
        if (data && Object.keys(data).length > 0) {
          console.log("Asset details fetched:", data); // Debugging statement
          setScannedAsset(data);
          setSelectedType(data.type); // Set the selectedType based on the fetched asset type
        } else {
          console.log("No data found for barcode:", barcode); // Debugging statement
          throw new Error("Asset not found");
        }
      } else {
        console.log("Response is not JSON:", response.data); // Debugging statement
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Error fetching asset details:", error);
      const addAsset = window.confirm(
        "Asset not found in the database. Do you want to add it?"
      );
      if (addAsset) {
        setShowAddForm(true);
      } else {
        setScannedAsset(null); // Ensure scannedAsset is reset if not found
      }
    }
  };

  const updateAsset = async () => {
    try {
      console.log("Updating asset:", editingAsset);
      const response = await axios.put(
        `${API_BASE_URL}/inventory/${editingAsset.id}`,
        editingAsset
      );
      console.log("Asset updated:", response.data);
      setScannedAsset(response.data);
      setEditingAsset(null);
      setShowForm(false);
      setShowTestHistory(false);
      setShowTests(false);
    } catch (error) {
      console.error("Error updating asset:", error);
    }
  };

  const deleteAsset = async (id) => {
    try {
      console.log("Deleting asset with id:", id);
      await axios.delete(`${API_BASE_URL}/inventory/${id}`);
      console.log("Asset deleted");
      setScannedAsset(null);
      setEditingAsset(null);
      setShowTestHistory(false);
      setShowTests(false);
    } catch (error) {
      console.error("Error deleting asset:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(`Input change - ${name}: ${value}`);
    if (name === "type") {
      setSelectedType(value);
    }
    if (editingAsset) {
      setEditingAsset({ ...editingAsset, [name]: value });
    } else if (showAddForm) {
      setNewAsset({ ...newAsset, [name]: value });
    } else {
      setScannedAsset({ ...scannedAsset, [name]: value });
    }
  };

  const saveTestResults = async (assetId, testResults) => {
    try {
      console.log("Saving test results for asset:", assetId, testResults);
      const response = await axios.put(
        `${API_BASE_URL}/inventory/${assetId}/test-history`,
        { testResults }
      );
      console.log("Test results saved:", response.data);

      // Update the asset's fields with the test results
      setScannedAsset((prevAsset) => ({
        ...prevAsset,
        ...testResults,
      }));

      // Update the asset in the database
      await axios.put(`${API_BASE_URL}/inventory/${assetId}`, {
        ...testResults,
      });
      console.log("Asset fields updated in the database");
    } catch (error) {
      console.error("Error saving test results:", error);
    }
  };

  const addAsset = async () => {
    if (newAsset.type && newAsset.date && newAsset.assetNumber) {
      try {
        console.log("Adding asset:", newAsset);
        const response = await axios.post(
          `${API_BASE_URL}/inventory`,
          newAsset
        );
        console.log("Asset added:", response.data);
        setScannedAsset(response.data);
        setShowAddForm(false);
      } catch (error) {
        console.error("Error adding asset:", error);
      }
    } else {
      console.error("Please fill in all required fields.");
    }
  };

  const handleCancelSearch = () => {
    setBarcode("");
    setScannedAsset(null);
    setManageAssetId(null);
  };

  return (
    <div>
      {!editingAsset && !showTestHistory && !showTests && (
        <>
          <h1>Scan barcode or Input A-number</h1>
          <input
            type="text"
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
            placeholder="Scan barcode here"
            autoFocus
          />
        </>
      )}
      {scannedAsset && !showForm && !showTestHistory && !showTests && (
        <div className="asset-details">
          <h2>Asset Details</h2>
          <table>
            <tbody>
              <tr>
                <td>Type:</td>
                <td>{scannedAsset.type}</td>
              </tr>
              <tr>
                <td>Date:</td>
                <td>{scannedAsset.date}</td>
              </tr>
              <tr>
                <td>Asset Number:</td>
                <td>{scannedAsset.assetNumber}</td>
              </tr>
              <tr>
                <td>Asset Location:</td>
                <td>{scannedAsset.assetLocation}</td>
              </tr>
              {scannedAsset.type === "Bed" && (
                <>
                  {scannedAsset.cordIntegrity && (
                    <tr>
                      <td>Cord Integrity:</td>
                      <td>{scannedAsset.cordIntegrity}</td>
                    </tr>
                  )}
                  {scannedAsset.groundWireResistance && (
                    <tr>
                      <td>Ground Wire Resistance:</td>
                      <td>{scannedAsset.groundWireResistance}</td>
                    </tr>
                  )}
                  {scannedAsset.groundLeakageCurrent && (
                    <tr>
                      <td>Ground Leakage Current:</td>
                      <td>{scannedAsset.groundLeakageCurrent}</td>
                    </tr>
                  )}
                  {scannedAsset.chassisTouchCurrent && (
                    <tr>
                      <td>Chassis Touch Current:</td>
                      <td>{scannedAsset.chassisTouchCurrent}</td>
                    </tr>
                  )}
                </>
              )}
              {scannedAsset.type === "Power Strip" && (
                <>
                  {scannedAsset.cordIntegrity && (
                    <tr>
                      <td>Cord Integrity:</td>
                      <td>{scannedAsset.cordIntegrity}</td>
                    </tr>
                  )}
                  {scannedAsset.physicalIntegrity && (
                    <tr>
                      <td>Physical Integrity:</td>
                      <td>{scannedAsset.physicalIntegrity}</td>
                    </tr>
                  )}
                  {scannedAsset.polarity && (
                    <tr>
                      <td>Polarity:</td>
                      <td>{scannedAsset.polarity}</td>
                    </tr>
                  )}
                  {scannedAsset.continuityOfGround && (
                    <tr>
                      <td>Continuity of Ground:</td>
                      <td>{scannedAsset.continuityOfGround}</td>
                    </tr>
                  )}
                  {scannedAsset.groundTension && (
                    <tr>
                      <td>Ground Tension:</td>
                      <td>{scannedAsset.groundTension}</td>
                    </tr>
                  )}
                  {scannedAsset.ampacity && (
                    <tr>
                      <td>Ampacity:</td>
                      <td>{scannedAsset.ampacity}</td>
                    </tr>
                  )}
                </>
              )}
              {scannedAsset.type === "Medical Equipment" && (
                <>
                  {scannedAsset.cordIntegrity && (
                    <tr>
                      <td>Cord Integrity:</td>
                      <td>{scannedAsset.cordIntegrity}</td>
                    </tr>
                  )}
                  {scannedAsset.groundWireResistance && (
                    <tr>
                      <td>Ground Wire Resistance:</td>
                      <td>{scannedAsset.groundWireResistance}</td>
                    </tr>
                  )}
                  {scannedAsset.groundLeakageCurrent && (
                    <tr>
                      <td>Ground Leakage Current:</td>
                      <td>{scannedAsset.groundLeakageCurrent}</td>
                    </tr>
                  )}
                  {scannedAsset.chassisTouchCurrent && (
                    <tr>
                      <td>Chassis Touch Current:</td>
                      <td>{scannedAsset.chassisTouchCurrent}</td>
                    </tr>
                  )}
                </>
              )}
            </tbody>
          </table>
          {manageAssetId === scannedAsset.id ? (
            <div className="button-container">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  console.log("Edit button clicked for asset:", scannedAsset);
                  setEditingAsset(scannedAsset);
                  setShowForm(true);
                  setShowTestHistory(false);
                  setShowTests(false);
                }}
              >
                Edit
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  console.log("Test button clicked for asset:", scannedAsset);
                  setEditingAsset(scannedAsset);
                  setShowTests(true);
                  setShowForm(false);
                  setShowTestHistory(false);
                }}
              >
                Test
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  console.log(
                    "Tests History button clicked for asset:",
                    scannedAsset
                  );
                  setEditingAsset(scannedAsset);
                  setShowTestHistory(true);
                  setShowForm(false);
                  setShowTests(false);
                }}
              >
                Tests History
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  console.log("Cancel button clicked");
                  handleCancelSearch();
                }}
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="button-container">
              <button
                onClick={() => {
                  console.log("Manage button clicked for asset:", scannedAsset);
                  setManageAssetId(scannedAsset.id);
                }}
              >
                Manage
              </button>
              <button
                onClick={() => {
                  console.log("Cancel button clicked");
                  handleCancelSearch();
                }}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      )}
      {showForm && (
        <AssetForm
          asset={editingAsset || scannedAsset}
          selectedType={selectedType} // Pass the selectedType prop
          handleInputChange={handleInputChange}
          handleSubmit={updateAsset}
          handleCancel={() => {
            console.log("Cancel button clicked");
            setEditingAsset(null);
            setShowForm(false);
            setShowTestHistory(false);
            setShowTests(false);
          }}
          isEditing={!!editingAsset}
          handleDelete={() => deleteAsset(editingAsset.id)}
        />
      )}
      {showTestHistory && editingAsset && (
        <TestHistory assetId={editingAsset.id} assetType={editingAsset.type} />
      )}
      {showTests && editingAsset && (
        <Test
          asset={editingAsset}
          saveTestResults={saveTestResults}
          handleCancel={() => {
            console.log("Cancel button clicked");
            setEditingAsset(null);
            setShowForm(false);
            setShowTestHistory(false);
            setShowTests(false);
          }}
        />
      )}
      {showAddForm && (
        <AssetForm
          asset={newAsset}
          selectedType={selectedType}
          handleInputChange={handleInputChange}
          handleSubmit={addAsset}
          handleCancel={() => {
            console.log("Cancel button clicked");
            setShowAddForm(false);
          }}
          isEditing={false}
        />
      )}
    </div>
  );
};

export default ScanAsset;
