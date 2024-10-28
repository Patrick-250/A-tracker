import React from "react";
import "./Category.scss";
import { FaEye } from "react-icons/fa";

const categories = [
  { name: "Beds", stock: 76, percentage: "30% of total stock" },
  { name: "Power Strips", stock: 50, percentage: "20% of total stock" },
  { name: "Medical Equipment", stock: 30, percentage: "15% of total stock" },
  {
    name: "Electronic Appliances",
    stock: 40,
    percentage: "25% of total stock",
  },
];

const Category = () => {
  return (
    <div className="cat">
      <span className="h">All Categories</span>
      <div className="card-c">
        {categories.map((category, index) => (
          <CatCard
            key={index}
            name={category.name}
            stock={category.stock}
            percentage={category.percentage}
          />
        ))}
      </div>
    </div>
  );
};

const CatCard = ({ name, stock, percentage }) => {
  return (
    <div className="CatCard">
      <div className="left">
        <span className="t">{name}</span>
        <span className="s">{stock}</span>
      </div>
      <div className="right">
        <div className="eye">
          <FaEye size={40} className="d" />
        </div>
        <div className="pc">
          <span className="c">{percentage}</span>
        </div>
      </div>
    </div>
  );
};

export default Category;
