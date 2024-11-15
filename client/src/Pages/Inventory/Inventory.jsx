import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Inventory.scss";

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
    continuityOfGround: "",
    groundTension: "",
    ampacity: "",
  });
  const [editingAsset, setEditingAsset] = useState(null);
  const [selectedType, setSelectedType] = useState(filterType || "");
  const [showForm, setShowForm] = useState(false);
  const [showTestHistory, setShowTestHistory] = useState(false);

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
      const response = await axios.get(`${API_BASE_URL}/inventory`);
      setAssets(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching assets:", error);
    }
  };

  const addAsset = async () => {
    if (newAsset.type && newAsset.date && newAsset.assetNumber) {
      try {
        const response = await axios.post(
          `${API_BASE_URL}/inventory`,
          newAsset
        );
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
      const response = await axios.put(
        `${API_BASE_URL}/inventory/${editingAsset._id}`,
        editingAsset
      );
      setAssets(
        assets.map((asset) =>
          asset._id === editingAsset._id ? response.data : asset
        )
      );
      setEditingAsset(null);
      setShowForm(false);
      setShowTestHistory(false);
      onAssetAdded();
    } catch (error) {
      console.error("Error updating asset:", error);
    }
  };

  const deleteAsset = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/inventory/${id}`);
      setAssets(assets.filter((asset) => asset._id !== id));
      setEditingAsset(null);
      setShowTestHistory(false);
      onAssetAdded();
    } catch (error) {
      console.error("Error deleting asset:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingAsset) {
      setEditingAsset({ ...editingAsset, [name]: value });
    } else {
      setNewAsset({ ...newAsset, [name]: value });
    }
  };

  const resetNewAsset = () => {
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
      continuityOfGround: "",
      groundTension: "",
      ampacity: "",
    });
    setSelectedType("");
  };

  const renderFormFields = (asset) => {
    switch (asset.type) {
      case "Bed":
        return (
          <>
            <input
              type="date"
              name="date"
              placeholder="Date"
              value={asset.date}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="assetNumber"
              placeholder="Asset Number"
              value={asset.assetNumber}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="assetLocation"
              placeholder="Asset Location"
              value={asset.assetLocation}
              onChange={handleInputChange}
            />
            <select
              name="cordIntegrity"
              value={asset.cordIntegrity}
              onChange={handleInputChange}
            >
              <option value="Pass">Pass</option>
              <option value="Fail">Fail</option>
            </select>
            <input
              type="text"
              name="groundWireResistance"
              placeholder="Ground Wire Resistance"
              value={asset.groundWireResistance}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="groundLeakageCurrent"
              placeholder="Ground Leakage Current"
              value={asset.groundLeakageCurrent}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="chassisTouchCurrent"
              placeholder="Chassis Touch Current"
              value={asset.chassisTouchCurrent}
              onChange={handleInputChange}
            />
          </>
        );
      case "Power Strip":
        return (
          <>
            <input
              type="date"
              name="date"
              placeholder="Date"
              value={asset.date}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="assetNumber"
              placeholder="Plug Strip Asset Number"
              value={asset.assetNumber}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="assetLocation"
              placeholder="Location"
              value={asset.assetLocation}
              onChange={handleInputChange}
            />
            <select
              name="cordIntegrity"
              value={asset.cordIntegrity}
              onChange={handleInputChange}
            >
              <option value="Pass">Pass</option>
              <option value="Fail">Fail</option>
            </select>
            <input
              type="text"
              name="physicalIntegrity"
              placeholder="Physical Integrity"
              value={asset.physicalIntegrity}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="polarity"
              placeholder="Polarity"
              value={asset.polarity}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="continuityOfGround"
              placeholder="Continuity of Ground"
              value={asset.continuityOfGround}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="groundTension"
              placeholder="Ground Tension"
              value={asset.groundTension}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="ampacity"
              placeholder="Ampacity"
              value={asset.ampacity}
              onChange={handleInputChange}
            />
          </>
        );
      case "Medical Equipment":
        return (
          <>
            <input
              type="date"
              name="date"
              placeholder="Date"
              value={asset.date}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="assetNumber"
              placeholder="Asset Number"
              value={asset.assetNumber}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="assetName"
              placeholder="Asset Name"
              value={asset.assetName}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="assetLocation"
              placeholder="Asset Location"
              value={asset.assetLocation}
              onChange={handleInputChange}
            />
          </>
        );
      case "Electronic Appliances":
        return (
          <>
            <input
              type="date"
              name="date"
              placeholder="Date"
              value={asset.date}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="assetNumber"
              placeholder="Asset Number"
              value={asset.assetNumber}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="assetName"
              placeholder="Asset Name"
              value={asset.assetName}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="assetLocation"
              placeholder="Asset Location"
              value={asset.assetLocation}
              onChange={handleInputChange}
            />
          </>
        );

      default:
        return null;
    }
  };

  const renderTestHistory = (asset) => {
    const testHistory = [
      {
        date: "2023-09-01",
        fields: {
          cordIntegrity: "Pass",
          groundWireResistance: "0.5 Ohms",
          groundLeakageCurrent: "0.1 mA",
          chassisTouchCurrent: "0.05 mA",
          physicalIntegrity: "Good",
          polarity: "Correct",
          continuityOfGround: "Good",
          groundTension: "0.2 Ohms",
          ampacity: "70%",
        },
      },
      {
        date: "2023-08-01",
        fields: {
          cordIntegrity: "Fail",
          groundWireResistance: "0.6 Ohms",
          groundLeakageCurrent: "0.2 mA",
          chassisTouchCurrent: "0.1 mA",
          physicalIntegrity: "Poor",
          polarity: "Incorrect",
          continuityOfGround: "Poor",
          groundTension: "0.3 Ohms",
          ampacity: "80%",
        },
      },
    ];

    return (
      <div className="test-history">
        <h3>Test History for {asset.assetNumber}</h3>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Cord Integrity</th>
              <th>Ground Wire Resistance</th>
              <th>Ground Leakage Current</th>
              <th>Chassis Touch Current</th>
              <th>Physical Integrity</th>
              <th>Polarity</th>
              <th>Continuity of Ground</th>
              <th>Ground Tension</th>
              <th>Ampacity</th>
            </tr>
          </thead>
          <tbody>
            {testHistory.map((test, index) => (
              <tr key={index}>
                <td>{test.date}</td>
                <td>{test.fields.cordIntegrity}</td>
                <td>{test.fields.groundWireResistance}</td>
                <td>{test.fields.groundLeakageCurrent}</td>
                <td>{test.fields.chassisTouchCurrent}</td>
                <td>{test.fields.physicalIntegrity}</td>
                <td>{test.fields.polarity}</td>
                <td>{test.fields.continuityOfGround}</td>
                <td>{test.fields.groundTension}</td>
                <td>{test.fields.ampacity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
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
          setShowForm(true);
          setEditingAsset(null);
          setShowTestHistory(false);
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
        <div className="form">
          <select
            name="type"
            value={selectedType}
            onChange={(e) => {
              setSelectedType(e.target.value);
              handleInputChange(e);
            }}
          >
            <option value="">Select Asset Type</option>
            <option value="Bed">Bed</option>
            <option value="Power Strip">Power Strip</option>
            <option value="Medical Equipment">Medical Equipment</option>
            <option value="Electronic Appliances">Electronic Appliances</option>
          </select>
          {selectedType && renderFormFields(editingAsset || newAsset)}
          {editingAsset ? (
            <>
              <button onClick={updateAsset}>Update Asset</button>
              <button onClick={() => deleteAsset(editingAsset._id)}>
                Delete Asset
              </button>
              <button
                onClick={() => {
                  setEditingAsset(null);
                  setShowForm(false);
                  setShowTestHistory(false);
                }}
              >
                Cancel
              </button>
            </>
          ) : (
            selectedType && <button onClick={addAsset}>Add Asset</button>
          )}
        </div>
      )}
      {showTestHistory && editingAsset && renderTestHistory(editingAsset)}
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
                    <th>Cord Integrity</th>
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
                        <th>Continuity of Ground</th>
                        <th>Ground Tension</th>
                        <th>Ampacity</th>
                      </>
                    )}
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {groupedAssets[type].map((asset) => (
                    <tr key={asset._id}>
                      <td>{asset.date}</td>
                      <td>{asset.assetNumber}</td>
                      <td>{asset.assetLocation}</td>
                      <td>
                        {editingAsset && editingAsset._id === asset._id ? (
                          <select
                            value={asset.cordIntegrity}
                            onChange={(e) => {
                              const updatedAssets = assets.map((a) =>
                                a._id === asset._id
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
                          <td>{asset.continuityOfGround}</td>
                          <td>{asset.groundTension}</td>
                          <td>{asset.ampacity}</td>
                        </>
                      )}
                      <td>
                        <a
                          href="#"
                          className="edit"
                          onClick={(e) => {
                            e.preventDefault();
                            setEditingAsset(asset);
                            setShowForm(true);
                            setSelectedType(asset.type);
                            setShowTestHistory(false);
                          }}
                        >
                          Edit
                        </a>
                        <a
                          href="#"
                          className="tests"
                          onClick={(e) => {
                            e.preventDefault();
                            setEditingAsset(asset);
                            setShowTestHistory(true);
                          }}
                        >
                          Tests
                        </a>
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
