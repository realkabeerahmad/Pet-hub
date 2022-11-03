import React from "react";
import { Link } from "react-router-dom";
import "./ShopCard.css";
const ShopCard = ({ Product, setProduct }) => {
  const { _id, name, Image, quantity, price } = Product;
  const serverBaseURL = "http://localhost:8000";
  function setShopDetails() {
    setProduct(Product);
  }

  return (
    <>
      <Link
        exact
        to={`/product/${_id}`}
        onClick={setShopDetails}
        className="ShopCardWrap"
      >
        <div className="ShopCard">
          <div className="img">
            <img src={`${serverBaseURL}/${Image}`} />
          </div>
          <div className="details">
            <h2>{name}</h2>
            <h4>PKR&nbsp;&nbsp;{price}</h4>
          </div>
          <p className="Quantity">
            {quantity <= 0 ? "Out of Stock" : "In Stock"}
          </p>
        </div>
      </Link>
    </>
  );
};

export default ShopCard;
