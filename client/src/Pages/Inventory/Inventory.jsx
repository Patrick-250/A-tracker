import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Inventory.scss";
import TestHistory from "../TestHistory/TestHistory";
import Test from "../Test/Test";
import AssetForm from "../AssetForm/AssetForm"; // Import the AssetForm component

const Inventory = ({
  onAssetAdded = () => {},
  scannedAsset,
  assets: propAssets,
  filterType,
}) => {
  const [assets, setAssets] = useState([]);
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
  const [editingAsset, setEditingAsset] = useState(null);
  const [selectedType, setSelectedType] = useState(filterType || "");
  const [showForm, setShowForm] = useState(false);
  const [showTestHistory, setShowTestHistory] = useState(false);
  const [showTests, setShowTests] = useState(false);
  const [manageAssetId, setManageAssetId] = useState(null);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    if (!propAssets) {
      fetchAssets();
    } else {
      setAssets(propAssets);
    }
  }, [propAssets]);

  useEffect(() => {
    if (scannedAsset) {
      setNewAsset(scannedAsset);
    }
  }, [scannedAsset]);

  useEffect(() => {
    setSelectedType(filterType);
  }, [filterType]);

  const fetchAssets = async () => {
    try {
      console.log("Fetching assets...");
      const response = await axios.get(`${API_BASE_URL}/inventory`);
      console.log("Assets fetched:", response.data);
      setAssets(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching assets:", error);
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
        setAssets([...assets, response.data]);
        resetNewAsset();
        setShowForm(false);
        onAssetAdded();
      } catch (error) {
        console.error("Error adding asset:", error);
      }
    } else {
      console.error("Please fill in all required fields.");
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
      setAssets(
        assets.map((asset) =>
          asset.id === editingAsset.id ? response.data : asset
        )
      );
      setEditingAsset(null);
      setShowForm(false);
      setShowTestHistory(false);
      setShowTests(false);
      onAssetAdded();
    } catch (error) {
      console.error("Error updating asset:", error);
    }
  };

  const deleteAsset = async (id) => {
    try {
      console.log("Deleting asset with id:", id);
      await axios.delete(`${API_BASE_URL}/inventory/${id}`);
      console.log("Asset deleted");
      setAssets(assets.filter((asset) => asset.id !== id));
      setEditingAsset(null);
      setShowTestHistory(false);
      setShowTests(false);
      onAssetAdded();
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
    } else {
      setNewAsset({ ...newAsset, [name]: value });
    }
  };

  const resetNewAsset = () => {
    console.log("Resetting new asset form");
    setNewAsset({
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
    setSelectedType("");
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
      setAssets((prevAssets) => {
        const updatedAssets = prevAssets.map((asset) => {
          if (asset.id === assetId) {
            console.log(
              "Updating asset fields with test results:",
              testResults
            );
            return {
              ...asset,
              ...testResults,
            };
          }
          return asset;
        });
        console.log("Updated assets:", updatedAssets);
        return updatedAssets;
      });

      // Update the asset in the database
      await axios.put(`${API_BASE_URL}/inventory/${assetId}`, {
        ...testResults,
      });
      console.log("Asset fields updated in the database");
    } catch (error) {
      console.error("Error saving test results:", error);
    }
  };

  const filteredAssets = selectedType
    ? assets.filter((asset) => asset.type === selectedType)
    : assets;

  const groupedAssets = filteredAssets.reduce((acc, asset) => {
    if (!acc[asset.type]) {
      acc[asset.type] = [];
    }
    acc[asset.type].push(asset);
    return acc;
  }, {});

  return (
    <div className="inventory">
      <button
        className="add-asset"
        onClick={() => {
          console.log("Add Asset button clicked");
          setShowForm(true);
          setEditingAsset(null);
          setShowTestHistory(false);
          setShowTests(false);
          setSelectedType("Bed");
          setNewAsset({
            ...newAsset,
            type: "Bed",
          });
        }}
      >
        Add Asset
      </button>
      {showForm && (
        <AssetForm
          asset={editingAsset || newAsset}
          selectedType={selectedType}
          handleInputChange={handleInputChange}
          handleSubmit={editingAsset ? updateAsset : addAsset}
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
      {!editingAsset && !showForm && (
        <>
          {Object.keys(groupedAssets).map((type) => (
            <div key={type}>
              <h2>
                {type === "Bed"
                  ? "Beds"
                  : type === "Power Strip"
                  ? "Power Strips"
                  : type === "Medical Equipment"
                  ? "Medical Equipment"
                  : type === "Electronic Appliances"
                  ? "Electronic Appliances"
                  : type}
              </h2>
              <table className="asset-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Asset Number</th>
                    <th>Asset Location</th>
                    {type !== "Medical Equipment" &&
                      type !== "Electronic Appliances" && (
                        <th>Cord Integrity</th>
                      )}
                    {type === "Bed" && (
                      <>
                        <th>Ground Wire Resistance</th>
                        <th>Ground Leakage Current</th>
                        <th>Chassis Touch Current</th>
                      </>
                    )}
                    {type === "Power Strip" && (
                      <>
                        <th>Physical Integrity</th>
                        <th>Polarity</th>
                        <th>Continuity of Ground Tension</th> {/* New field */}
                        <th>Ampacity</th>
                      </>
                    )}
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {groupedAssets[type].map((asset) => (
                    <tr key={asset.id}>
                      <td>{asset.date}</td>
                      <td>{asset.assetNumber}</td>
                      <td>{asset.assetLocation}</td>
                      {type !== "Medical Equipment" &&
                        type !== "Electronic Appliances" && (
                          <td>
                            {editingAsset && editingAsset.id === asset.id ? (
                              <select
                                value={asset.cordIntegrity}
                                onChange={(e) => {
                                  const updatedAssets = assets.map((a) =>
                                    a.id === asset.id
                                      ? {
                                          ...a,
                                          cordIntegrity: e.target.value,
                                        }
                                      : a
                                  );
                                  setAssets(updatedAssets);
                                }}
                              >
                                <option value="Pass">Pass</option>
                                <option value="Fail">Fail</option>
                              </select>
                            ) : (
                              asset.cordIntegrity
                            )}
                          </td>
                        )}
                      {type === "Bed" && (
                        <>
                          <td>{asset.groundWireResistance}</td>
                          <td>{asset.groundLeakageCurrent}</td>
                          <td>{asset.chassisTouchCurrent}</td>
                        </>
                      )}
                      {type === "Power Strip" && (
                        <>
                          <td>{asset.physicalIntegrity}</td>
                          <td>{asset.polarity}</td>
                          <td>{asset.continuityOfGroundTension}</td>{" "}
                          {/* New field */}
                          <td>{asset.ampacity}</td>
                        </>
                      )}
                      <td>
                        {manageAssetId === asset.id ? (
                          <>
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                console.log(
                                  "Edit button clicked for asset:",
                                  asset
                                );
                                setEditingAsset(asset);
                                setShowForm(true);
                                setSelectedType(asset.type);
                                setShowTestHistory(false);
                                setShowTests(false);
                              }}
                            >
                              Edit
                            </button>
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                console.log(
                                  "Test button clicked for asset:",
                                  asset
                                );
                                setEditingAsset(asset);
                                setShowTests(true);
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
                                  asset
                                );
                                setEditingAsset(asset);
                                setShowTestHistory(true);
                                setShowTests(false);
                              }}
                            >
                              Tests History
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => {
                              console.log(
                                "Manage button clicked for asset:",
                                asset
                              );
                              setManageAssetId(asset.id);
                            }}
                          >
                            Manage
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Inventory;
