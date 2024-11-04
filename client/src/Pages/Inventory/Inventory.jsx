import React, { useState, useEffect } from "react";
import "./Inventory.scss";

const initialAssets = [
  {
    id: 1,
    type: "Bed",
    date: "2023-10-01",
    assetNumber: "B123",
    assetLocation: "Room 101",
    cordIntegrity: "Pass",
    groundWireResistance: "0.5 Ohms",
    groundLeakageCurrent: "0.1 mA",
    chassisTouchCurrent: "0.05 mA",
  },
  {
    id: 2,
    type: "Power Strip",
    date: "2023-10-02",
    assetNumber: "PS456",
    location: "Room 202",
    cordIntegrity: "Pass",
    physicalIntegrity: "Good",
    polarity: "Correct",
    continuityOfGround: "Good",
    groundTension: "0.2 Ohms",
    ampacity: "70%",
  },
  // Add more sample data as needed
];

const Inventory = ({ scannedAsset }) => {
  const [assets, setAssets] = useState(initialAssets);
  const [newAsset, setNewAsset] = useState({
    type: "",
    date: "",
    assetNumber: "",
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
  const [selectedType, setSelectedType] = useState("");
  const [filterType, setFilterType] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (scannedAsset) {
      setNewAsset(scannedAsset);
    }
  }, [scannedAsset]);

  const addAsset = () => {
    if (newAsset.type && newAsset.date && newAsset.assetNumber) {
      setAssets([...assets, { ...newAsset, id: Date.now() }]);
      resetNewAsset();
      setShowForm(false);
    }
  };

  const updateAsset = () => {
    setAssets(
      assets.map((asset) =>
        asset.id === editingAsset.id ? { ...editingAsset } : asset
      )
    );
    setEditingAsset(null);
    setShowForm(false);
  };

  const deleteAsset = (id) => {
    setAssets(assets.filter((asset) => asset.id !== id));
    setEditingAsset(null);
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
              name="location"
              placeholder="Location"
              value={asset.location}
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
      // Add more cases for other asset types if needed
      default:
        return null;
    }
  };

  const categorizedAssets = assets.reduce((acc, asset) => {
    if (!acc[asset.type]) {
      acc[asset.type] = [];
    }
    acc[asset.type].push(asset);
    return acc;
  }, {});

  const filteredAssets = filterType
    ? assets.filter((asset) => asset.type === filterType)
    : assets;

  return (
    <div className="inventory">
      <button
        className="add-asset"
        onClick={() => {
          setShowForm(true);
          setEditingAsset(null);
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
            <option value="Bed">Beds</option>
            <option value="Power Strip">Power Strips</option>
            {/* Add more options for other asset types if needed */}
          </select>
          {selectedType && renderFormFields(editingAsset || newAsset)}
          {editingAsset ? (
            <>
              <button onClick={updateAsset}>Update Asset</button>
              <button onClick={() => deleteAsset(editingAsset.id)}>
                Delete Asset
              </button>
              <button
                onClick={() => {
                  setEditingAsset(null);
                  setShowForm(false);
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
      <div className="filter">
        <select
          name="filterType"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="">All Asset Types</option>
          <option value="Bed">Beds</option>
          <option value="Power Strip">Power Strips</option>
          {/* Add more options for other asset types if needed */}
        </select>
      </div>
      {Object.keys(categorizedAssets).map(
        (type) =>
          (filterType === "" || filterType === type) && (
            <div key={type}>
              <h2>
                {type === "Bed"
                  ? "Beds"
                  : type === "Power Strip"
                  ? "Power Strips"
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
                  {filteredAssets
                    .filter((asset) => asset.type === type)
                    .map((asset) => (
                      <tr key={asset.id}>
                        <td>{asset.date}</td>
                        <td>{asset.assetNumber}</td>
                        <td>{asset.assetLocation}</td>
                        <td>
                          <select
                            value={asset.cordIntegrity}
                            onChange={(e) => {
                              const updatedAssets = assets.map((a) =>
                                a.id === asset.id
                                  ? { ...a, cordIntegrity: e.target.value }
                                  : a
                              );
                              setAssets(updatedAssets);
                            }}
                          >
                            <option value="Pass">Pass</option>
                            <option value="Fail">Fail</option>
                          </select>
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
                          <button
                            onClick={() => {
                              setEditingAsset(asset);
                              setShowForm(true);
                              setSelectedType(asset.type);
                            }}
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )
      )}
    </div>
  );
};

export default Inventory;
