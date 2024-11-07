import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Settings from "./Pages/Settings/Settings";
import Login from "./Pages/Login/Login";
import Inventory from "./Pages/Inventory/Inventory";
import ScanAsset from "./Pages/ScanAsset/ScanAsset"; // Import ScanAsset component
import Home from "./Pages/Home/Home";
import Notifications from "./Pages/Notifications/Notifications";
import ReportBug from "./Pages/ReportBug/ReportBug"; // Import ReportBug component
import { useSelector } from "react-redux";

function App() {
  // const user = useSelector((state) => state.auth.user); // Get user from Redux store
  const user = true;
  const [scannedAsset, setScannedAsset] = useState(null); // State for scanned asset

  return (
    <Router>
      <AppContent
        user={user}
        scannedAsset={scannedAsset}
        setScannedAsset={setScannedAsset}
      />
    </Router>
  );
}

function AppContent({ user, scannedAsset, setScannedAsset }) {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/report-bug" &&
      location.pathname !== "/scan-asset" ? (
        <Layout>
          <Routes>
            <Route path="/" element={user ? <Home /> : <Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/inventory"
              element={<Inventory scannedAsset={scannedAsset} />}
            />
            <Route
              path="/scan-asset"
              element={<ScanAsset onScanComplete={setScannedAsset} />}
            />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/report-bug" element={<ReportBug />} />
          </Routes>
        </Layout>
      ) : (
        <Routes>
          <Route path="/report-bug" element={<ReportBug />} />
          <Route
            path="/scan-asset"
            element={<ScanAsset onScanComplete={setScannedAsset} />}
          />
        </Routes>
      )}
    </>
  );
}

export default App;
