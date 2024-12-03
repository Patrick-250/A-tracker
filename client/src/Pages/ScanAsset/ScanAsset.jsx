import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

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
      console.log("Fetching asset details for barcode:", barcode); // Debugging statement
      const response = await axios.get(`${API_BASE_URL}/inventory/${barcode}`);
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
      <h1>Scan Asset</h1>
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
