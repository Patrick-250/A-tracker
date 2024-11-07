import React, { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import JsBarcode from "jsbarcode";

const ScanAsset = ({ onScanComplete }) => {
  const [scannedAssetNumber, setScannedAssetNumber] = useState("");
  const [scannedAsset, setScannedAsset] = useState(null);
  const [assetType, setAssetType] = useState("");
  const [showScanner, setShowScanner] = useState(false);
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

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
  ];

  const handleScan = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      context.drawImage(img, 0, 0, canvas.width, canvas.height);
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      JsBarcode(canvas, imageData, {
        format: "CODE128",
        lineColor: "#000",
        width: 2,
        height: 100,
        displayValue: false,
        success: (barcode) => {
          setScannedAssetNumber(barcode);
          const asset = initialAssets.find(
            (asset) => asset.assetNumber === barcode && asset.type === assetType
          );
          if (asset) {
            setScannedAsset(asset);
            onScanComplete(asset);
          } else {
            alert("Asset not found");
          }
          setShowScanner(false);
        },
        error: (err) => {
          console.error(err);
        },
      });
    };
  };

  return (
    <div className="scan-asset">
      <h1>Scan Asset</h1>
      <select value={assetType} onChange={(e) => setAssetType(e.target.value)}>
        <option value="">Select Asset Type</option>
        <option value="Bed">Bed</option>
        <option value="Power Strip">Power Strip</option>
        {/* Add more asset types as needed */}
      </select>
      {assetType && (
        <>
          <button onClick={() => setShowScanner(true)}>Scan with Camera</button>
          {showScanner && (
            <>
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width="100%"
              />
              <canvas ref={canvasRef} style={{ display: "none" }} />
              <button onClick={handleScan}>Capture</button>
            </>
          )}
        </>
      )}
      {scannedAsset && (
        <div className="asset-details">
          <h2>Asset Details</h2>
          <p>Type: {scannedAsset.type}</p>
          <p>Date: {scannedAsset.date}</p>
          <p>Asset Number: {scannedAsset.assetNumber}</p>
          <p>Asset Location: {scannedAsset.assetLocation}</p>
          {scannedAsset.type === "Bed" && (
            <>
              <p>Cord Integrity: {scannedAsset.cordIntegrity}</p>
              <p>Ground Wire Resistance: {scannedAsset.groundWireResistance}</p>
              <p>Ground Leakage Current: {scannedAsset.groundLeakageCurrent}</p>
              <p>Chassis Touch Current: {scannedAsset.chassisTouchCurrent}</p>
            </>
          )}
          {scannedAsset.type === "Power Strip" && (
            <>
              <p>Cord Integrity: {scannedAsset.cordIntegrity}</p>
              <p>Physical Integrity: {scannedAsset.physicalIntegrity}</p>
              <p>Polarity: {scannedAsset.polarity}</p>
              <p>Continuity of Ground: {scannedAsset.continuityOfGround}</p>
              <p>Ground Tension: {scannedAsset.groundTension}</p>
              <p>Ampacity: {scannedAsset.ampacity}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ScanAsset;
