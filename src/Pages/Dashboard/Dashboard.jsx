import React from "react";
import Card from "../../Components/Card/Card";
import Category from "../../Components/Category/Category";
import "./Dashboard.scss";
const Dashboard = () => {
  return (
    <div className="dashboard">
      <Card />
      <Category />
      <Category />
      <Category />
    </div>
  );
};

export default Dashboard;
