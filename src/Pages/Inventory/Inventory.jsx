import React, { useState, useEffect } from "react";
import "./Inventory.scss";

const initialAssets = [
  {
    id: 1,
    type: "Bed",
    assetNumber: "B123",
    assetLocation: "Room 101",
    cordIntegrity: "Good",
    groundWireResistance: "0.5 Ohms",
    groundLeakageCurrent: "0.1 mA",
    chassisTouchCurrent: "0.05 mA",
  },
  {
    id: 2,
    type: "Power Strip",
    assetNumber: "PS456",
    location: "Room 202",
    cordIntegrity: "Good",
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
    assetNumber: "",
    assetLocation: "",
    cordIntegrity: "",
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

  useEffect(() => {
    if (scannedAsset) {
      setNewAsset(scannedAsset);
    }
  }, [scannedAsset]);

  const addAsset = () => {
    setAssets([...assets, { ...newAsset, id: Date.now() }]);
    resetNewAsset();
  };

  const updateAsset = () => {
    setAssets(
      assets.map((asset) =>
        asset.id === editingAsset.id ? { ...editingAsset } : asset
      )
    );
    setEditingAsset(null);
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
      assetNumber: "",
      assetLocation: "",
      cordIntegrity: "",
      groundWireResistance: "",
      groundLeakageCurrent: "",
      chassisTouchCurrent: "",
      physicalIntegrity: "",
      polarity: "",
      continuityOfGround: "",
      groundTension: "",
      ampacity: "",
    });
  };

  const renderFormFields = (asset) => {
    switch (asset.type) {
      case "Bed":
        return (
          <>
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
            <input
              type="text"
              name="cordIntegrity"
              placeholder="Cord Integrity"
              value={asset.cordIntegrity}
              onChange={handleInputChange}
            />
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
              type="text"
              name="assetNumber"
              placeholder="Asset Number"
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
            <input
              type="text"
              name="cordIntegrity"
              placeholder="Cord Integrity"
              value={asset.cordIntegrity}
              onChange={handleInputChange}
            />
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

  return (
    <div className="inventory">
      <div className="form">
        <select
          name="type"
          value={editingAsset ? editingAsset.type : newAsset.type}
          onChange={handleInputChange}
        >
          <option value="">Select Asset Type</option>
          <option value="Bed">Beds</option>
          <option value="Power Strip">Power Strips</option>
          {/* Add more options for other asset types if needed */}
        </select>
        {renderFormFields(editingAsset || newAsset)}
        {editingAsset ? (
          <>
            <button onClick={updateAsset}>Update Asset</button>
            <button onClick={() => deleteAsset(editingAsset.id)}>
              Delete Asset
            </button>
            <button onClick={() => setEditingAsset(null)}>Cancel</button>
          </>
        ) : (
          <button onClick={addAsset}>Add Asset</button>
        )}
      </div>
      {Object.keys(categorizedAssets).map((type) => (
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
                <th>Asset Number</th>
                <th>Asset Location</th>
                <th>Cord Integrity</th>
                <th>Ground Wire Resistance</th>
                <th>Ground Leakage Current</th>
                <th>Chassis Touch Current</th>
                <th>Physical Integrity</th>
                <th>Polarity</th>
                <th>Continuity of Ground</th>
                <th>Ground Tension</th>
                <th>Ampacity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categorizedAssets[type].map((asset) => (
                <tr key={asset.id}>
                  <td>{asset.assetNumber}</td>
                  <td>{asset.assetLocation}</td>
                  <td>{asset.cordIntegrity}</td>
                  <td>{asset.groundWireResistance}</td>
                  <td>{asset.groundLeakageCurrent}</td>
                  <td>{asset.chassisTouchCurrent}</td>
                  <td>{asset.physicalIntegrity}</td>
                  <td>{asset.polarity}</td>
                  <td>{asset.continuityOfGround}</td>
                  <td>{asset.groundTension}</td>
                  <td>{asset.ampacity}</td>
                  <td>
                    <button onClick={() => setEditingAsset(asset)}>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default Inventory;
