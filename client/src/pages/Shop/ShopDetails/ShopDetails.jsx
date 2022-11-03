import React from "react";

const ShopDetails = ({ Product }) => {
  const Server = "http://localhost:8000/";
  console.log(Product);

  return (
    <div className="Details">
      <div className="Details-Left">
        <img src={Server + Product.Image} />
      </div>
      <div className="Details-Right">
        <div className="Details-intro">
          <h2>{Product.name.toUpperCase()}</h2>
          <h3>PKR {Product.price}</h3>
        </div>
        <div className="Details-details">
          <p className="details-description"></p>
        </div>
      </div>
    </div>
  );
};

export default ShopDetails;
