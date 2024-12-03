import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

console.log("API_BASE_URL:", API_BASE_URL); // Debugging statement

const ScanAsset = () => {
  const [scannedAsset, setScannedAsset] = useState(null);
  const [barcode, setBarcode] = useState("");

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
      alert("Asset not found in the database");
      setScannedAsset(null); // Ensure scannedAsset is reset if not found
    }
  };

  return (
    <div>
      <h1>Scan barcode or Input the asset number</h1>
      <input
        type="text"
        value={barcode}
        onChange={(e) => setBarcode(e.target.value)}
        placeholder="Scan barcode here"
        autoFocus
      />
      {scannedAsset && (
        <div className="asset-details">
          <h2>Asset Details</h2>
          <p>Type: {scannedAsset.type}</p>
          <p>Date: {scannedAsset.date}</p>
          <p>Asset Number: {scannedAsset.assetNumber}</p>
          <p>Asset Location: {scannedAsset.assetLocation}</p>
          {scannedAsset.type === "Bed" && (
            <>
              {scannedAsset.cordIntegrity && (
                <p>Cord Integrity: {scannedAsset.cordIntegrity}</p>
              )}
              {scannedAsset.groundWireResistance && (
                <p>
                  Ground Wire Resistance: {scannedAsset.groundWireResistance}
                </p>
              )}
              {scannedAsset.groundLeakageCurrent && (
                <p>
                  Ground Leakage Current: {scannedAsset.groundLeakageCurrent}
                </p>
              )}
              {scannedAsset.chassisTouchCurrent && (
                <p>Chassis Touch Current: {scannedAsset.chassisTouchCurrent}</p>
              )}
            </>
          )}
          {scannedAsset.type === "Power Strip" && (
            <>
              {scannedAsset.cordIntegrity && (
                <p>Cord Integrity: {scannedAsset.cordIntegrity}</p>
              )}
              {scannedAsset.physicalIntegrity && (
                <p>Physical Integrity: {scannedAsset.physicalIntegrity}</p>
              )}
              {scannedAsset.polarity && (
                <p>Polarity: {scannedAsset.polarity}</p>
              )}
              {scannedAsset.continuityOfGround && (
                <p>Continuity of Ground: {scannedAsset.continuityOfGround}</p>
              )}
              {scannedAsset.groundTension && (
                <p>Ground Tension: {scannedAsset.groundTension}</p>
              )}
              {scannedAsset.ampacity && (
                <p>Ampacity: {scannedAsset.ampacity}</p>
              )}
            </>
          )}
          {scannedAsset.type === "Medical Equipment" && (
            <>
              {scannedAsset.cordIntegrity && (
                <p>Cord Integrity: {scannedAsset.cordIntegrity}</p>
              )}
              {scannedAsset.groundWireResistance && (
                <p>
                  Ground Wire Resistance: {scannedAsset.groundWireResistance}
                </p>
              )}
              {scannedAsset.groundLeakageCurrent && (
                <p>
                  Ground Leakage Current: {scannedAsset.groundLeakageCurrent}
                </p>
              )}
              {scannedAsset.chassisTouchCurrent && (
                <p>Chassis Touch Current: {scannedAsset.chassisTouchCurrent}</p>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ScanAsset;
