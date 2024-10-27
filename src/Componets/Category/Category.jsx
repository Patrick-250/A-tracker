import React from "react";
import "./Category.scss";
import { FaEye } from "react-icons/fa";
const Category = () => {
  return (
    <div className="cat">
      <span className="h">All Categories</span>
      <div className="card-c">
        <CatCard />
        <CatCard />
        <CatCard />
        <CatCard />
        <CatCard />
        <CatCard />
        <CatCard />
        <CatCard />
        <CatCard />
        <CatCard />
      </div>
    </div>
  );
};

const CatCard = () => {
  return (
    <div className="CatCard">
      <div className="left">
        <span className="t">Electronics</span>
        <span className="s">76</span>
      </div>
      <div className="right">
        <div className="eye">
          <FaEye size={40} className="d" />
        </div>
        <div className="pc">
          <span className="c">30% of total stock</span>
        </div>
      </div>
    </div>
  );
};

export default Category;
