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
import "./App.css";

function App() {
  const user = useSelector((state) => state.auth.user); // Get user from Redux store
  const [scannedAsset, setScannedAsset] = useState(null); // State for scanned asset

  return (
    <div className="app-background">
      <Router>
        <AppContent
          user={user}
          scannedAsset={scannedAsset}
          setScannedAsset={setScannedAsset}
        />
      </Router>
    </div>
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
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={user ? <Dashboard /> : <Navigate to="/login" />}
            />
            <Route
              path="/settings"
              element={user ? <Settings /> : <Navigate to="/login" />}
            />
            <Route
              path="/inventory"
              element={
                user ? (
                  <Inventory scannedAsset={scannedAsset} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/scan-asset"
              element={
                user ? (
                  <ScanAsset onScanComplete={setScannedAsset} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/notifications"
              element={user ? <Notifications /> : <Navigate to="/login" />}
            />
            <Route
              path="/report-bug"
              element={user ? <ReportBug /> : <Navigate to="/login" />}
            />
            {/* Catch-all route to redirect to login if the route doesn't exist */}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </Layout>
      ) : (
        <Routes>
          <Route
            path="/report-bug"
            element={user ? <ReportBug /> : <Navigate to="/login" />}
          />
          <Route
            path="/scan-asset"
            element={
              user ? (
                <ScanAsset onScanComplete={setScannedAsset} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          {/* Catch-all route to redirect to login if the route doesn't exist */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </>
  );
}

export default App;
