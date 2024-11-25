import React, { useState, useRef } from "react";
import Camera, { FACING_MODES, IMAGE_TYPES } from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import JsBarcode from "jsbarcode";

const ScanAsset = ({ onScanComplete }) => {
  const [scannedAssetNumber, setScannedAssetNumber] = useState("");
  const [scannedAsset, setScannedAsset] = useState(null);
  const [assetType, setAssetType] = useState("");
  const [showScanner, setShowScanner] = useState(false);
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

  const handleTakePhoto = (dataUri) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const img = new Image();
    img.src = dataUri;
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

  const handleCameraError = (error) => {
    console.error("Camera error:", error);
    alert(
      "An error occurred while accessing the camera. modern browsers do not allow access to scan APIs over http."
    );
    setShowScanner(false);
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
          <button
            onClick={() => {
              console.log("Scan with Camera clicked");
              setShowScanner(true);
            }}
          >
            Scan with Camera
          </button>
          {showScanner && (
            <>
              <Camera
                onTakePhoto={(dataUri) => {
                  handleTakePhoto(dataUri);
                }}
                onCameraError={(error) => {
                  handleCameraError(error);
                }}
                idealFacingMode={FACING_MODES.ENVIRONMENT}
                imageType={IMAGE_TYPES.JPG}
                isFullscreen={false}
              />
              <canvas ref={canvasRef} style={{ display: "none" }} />
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
