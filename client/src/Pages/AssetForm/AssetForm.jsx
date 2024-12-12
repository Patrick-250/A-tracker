import React from "react";

const AssetForm = ({
  asset,
  selectedType,
  handleInputChange,
  handleSubmit,
  handleCancel,
  isEditing,
  handleDelete,
}) => {
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
              disabled={isEditing} // Disable when editing
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
              disabled={isEditing} // Disable when editing
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
              name="continuityOfGroundTension"
              placeholder="Continuity of Ground Tension"
              value={asset.continuityOfGroundTension}
              onChange={(e) => {
                console.log(
                  `Input change - continuityOfGroundTension: ${e.target.value}`
                );
                handleInputChange(e);
              }}
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
              disabled={isEditing} // Disable when editing
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
              disabled={isEditing} // Disable when editing
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

  return (
    <div className="form">
      <select
        name="type"
        value={selectedType}
        onChange={handleInputChange}
        disabled={isEditing} // Disable when editing
      >
        <option value="">Select Asset Type</option>
        <option value="Bed">Bed</option>
        <option value="Power Strip">Power Strip</option>
        <option value="Medical Equipment">Medical Equipment</option>
        <option value="Electronic Appliances">Electronic Appliances</option>
      </select>
      {selectedType && renderFormFields(asset)}
      {isEditing ? (
        <>
          <button
            onClick={() => {
              console.log("Submitting asset:", asset);
              handleSubmit();
            }}
          >
            Update Asset
          </button>
          <button onClick={handleDelete}>Delete Asset</button>
          <button onClick={handleCancel}>Cancel</button>
        </>
      ) : (
        selectedType && (
          <button
            onClick={() => {
              console.log("Submitting asset:", asset);
              handleSubmit();
            }}
          >
            Add Asset
          </button>
        )
      )}
    </div>
  );
};

export default AssetForm;
