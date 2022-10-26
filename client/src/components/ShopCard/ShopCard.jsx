import React from "react";
import { Link } from "react-router-dom";
import "./ShopCard.css";
const ShopCard = ({ name, price, img, des, quan, link, setShopItem }) => {
  const serverBaseURL = "http://localhost:9002";
  function setShopDetails() {
    setShopItem({ name, price, img, des, quan, link });
  }
  return (
    <Link
      exact
      to={`/${link}`}
      onClick={setShopDetails}
      className="ShopCardWrap"
    >
      <div className="ShopCard">
        <div className="img">
          <img src={`${serverBaseURL}/${img}`} alt={`${name}`} />
        </div>
        <div className="details">
          <h2>{name} Dummy</h2>
          <h4>PKR&nbsp;&nbsp;{price}</h4>
        </div>
        <p className="Quantity">{quan <= 0 ? "Out of Stock" : "In Stock"}</p>
      </div>
    </Link>
  );
};

export default ShopCard;
