// src/components/Layout.jsx
import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import "./Layout.scss";
const Layout = ({ children }) => {
  return (
    <div className="layout">
      {/* Sidebar goes here */}
      <Sidebar />
      <main className="main">
        {/* header goes here */}
        <Navbar />
        {children}
      </main>
    </div>
  );
};

export default Layout;
