import React from "react";
import Card from "../../Componets/Card/Card";
import Category from "../../Componets/Category/Category";
import "./Dashboard.scss";
const Dashboard = () => {
  return (
    <div className="dashboard">
      <Card />
      <Category />
    </div>
  );
};

export default Dashboard;
