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
  // const user = useSelector((state) => state.auth.user); // Get usefrom Redux storer
  const user = true;
  const [scannedAsset, setScannedAsset] = useState(null); // State for scanned asset

  return (
    // this is more clean, readable and fixes bugs with sidebar not showing on some pages
    // shall show the header and sidebar when we have a user later on
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={user ? <Home /> : <Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
          <Route
            path="/inventory"
            element={<Inventory scannedAsset={scannedAsset} />}
          />
          <Route
            path="/scan-asset"
            element={<ScanAsset onScanComplete={setScannedAsset} />}
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
