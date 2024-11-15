// src/components/Layout.jsx
import React from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import "./Layout.scss";

const Layout = ({ children }) => {
  const location = useLocation();

  return (
    <div className="layout">
      {/* Sidebar goes here */}
      <Sidebar />
      <main className="main">
        {/* header goes here */}
        <Navbar location={location} />
        {children}
      </main>
    </div>
  );
};

export default Layout;
