import React from "react";
import { Link } from "react-router-dom";
import "./ShopCard.css";
const ShopCard = ({ Product, setProduct }) => {
  const serverBaseURL = "http://localhost:8000";
  function setShopDetails() {
    setProduct(Product);
  }

  return (
    <>
      <Link
        exact
        to={`/product`}
        onClick={setShopDetails}
        className="ShopCardWrap"
      >
        <div className="ShopCard">
          <div className="img">
            <img
              src={`${serverBaseURL}/${Product.Image}`}
              alt={`${Product.name}`}
            />
          </div>
          <div className="details">
            <h2>{Product.name}</h2>
            <h4>PKR&nbsp;&nbsp;{Product.price}</h4>
          </div>
          <p className="Quantity">
            {Product.quantity <= 0 ? "Out of Stock" : "In Stock"}
          </p>
        </div>
      </Link>
    </>
  );
};

export default ShopCard;
