import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Settings from "./Pages/Settings/Settings";
import Login from "./Pages/Login/Login";
import Inventory from "./Pages/Inventory/Inventory"; // Import Inventory component
import ScanAsset from "./Pages/ScanAsset/ScanAsset"; // Import ScanAsset component
import Home from "./Pages/Home/Home"; // Import Home component
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.auth.user); // Get user from Redux store
  const [scannedAsset, setScannedAsset] = useState(null); // State for scanned asset

  return (
    <Router>
      {user ? (
        <Routes>
          <Route
            path="/inventory"
            element={<Inventory scannedAsset={scannedAsset} />}
          />{" "}
          {/* Add Inventory route */}
          <Route
            path="/scan-asset"
            element={<ScanAsset onScanComplete={setScannedAsset} />}
          />{" "}
          {/* Add ScanAsset route */}
          <Route
            path="*"
            element={
              <Layout>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/home" element={<Home />} />{" "}
                  {/* Add Home route */}
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/login" element={<Navigate to="/" />} />
                </Routes>
              </Layout>
            }
          />
        </Routes>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
