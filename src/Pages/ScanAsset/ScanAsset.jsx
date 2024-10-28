import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BarcodeScannerComponent from "react-qr-barcode-scanner";

const ScanAsset = ({ onScanComplete }) => {
  const [scannedData, setScannedData] = useState(null);
  const [assetType, setAssetType] = useState("");
  const navigate = useNavigate();

  const handleScan = (err, result) => {
    if (result) {
      const scannedAsset = {
        type: assetType,
        assetNumber: "Scanned123",
        assetLocation: "Scanned Location",
        cordIntegrity: "Good",
        groundWireResistance: "0.5 Ohms",
        groundLeakageCurrent: "0.1 mA",
        chassisTouchCurrent: "0.05 mA",
        physicalIntegrity: "Good",
        polarity: "Correct",
        continuityOfGround: "Good",
        groundTension: "0.2 Ohms",
        ampacity: "70%",
      };
      setScannedData(scannedAsset);
      onScanComplete(scannedAsset);
      navigate("/inventory");
    }
    if (err) {
      console.error(err);
    }
  };

  const renderFields = () => {
    if (!scannedData) return null;

    switch (scannedData.type) {
      case "Bed":
        return (
          <>
            <div>Asset Number: {scannedData.assetNumber}</div>
            <div>Asset Location: {scannedData.assetLocation}</div>
            <div>Cord Integrity: {scannedData.cordIntegrity}</div>
            <div>
              Ground Wire Resistance: {scannedData.groundWireResistance}
            </div>
            <div>
              Ground Leakage Current: {scannedData.groundLeakageCurrent}
            </div>
            <div>Chassis Touch Current: {scannedData.chassisTouchCurrent}</div>
          </>
        );
      case "Power Strip":
        return (
          <>
            <div>Asset Number: {scannedData.assetNumber}</div>
            <div>Location: {scannedData.assetLocation}</div>
            <div>Cord Integrity: {scannedData.cordIntegrity}</div>
            <div>Physical Integrity: {scannedData.physicalIntegrity}</div>
            <div>Polarity: {scannedData.polarity}</div>
            <div>Continuity of Ground: {scannedData.continuityOfGround}</div>
            <div>Ground Tension: {scannedData.groundTension}</div>
            <div>Ampacity: {scannedData.ampacity}</div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="scan-asset">
      <h1>Scan Asset</h1>
      <div>
        <label htmlFor="assetType">Select Asset Type:</label>
        <select
          id="assetType"
          value={assetType}
          onChange={(e) => setAssetType(e.target.value)}
        >
          <option value="">Select Type</option>
          <option value="Bed">Bed</option>
          <option value="Power Strip">Power Strip</option>
          {/* Add more options as necessary */}
        </select>
      </div>
      <BarcodeScannerComponent width={500} height={500} onUpdate={handleScan} />
      {scannedData && (
        <div className="scanned-data">
          <h2>Scanned Data</h2>
          {renderFields()}
        </div>
      )}
    </div>
  );
};

export default ScanAsset;
