import React from "react";
import "./ShopDetails.css";
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
          <h1>{Product.name.toUpperCase()}</h1>
          <h2>PKR {Product.price}</h2>
        </div>
        <div className="Details-details">
          <p className="details-description">{Product.description}</p>
          <table>
            <tbody>
              <tr>
                <th>Warranty:</th>
                <td>{Product.Warranty}</td>
                <th>Return:</th>
                <td>{Product.Return}</td>
              </tr>
              <tr>
                <th>Standard Shipping:</th>
                <td>{Product.StandardShipping}</td>
                <th>Fast Shipping:</th>
                <td>{Product.FastShipping}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="details-button">
          <div className="details-fav">
            <i className="fa fa-heart"></i>
          </div>
          <div className="details-buyNow">BUY NOW</div>
          <div className="details-addToCart">
            <i className="fa fa-shopping-cart"></i> ADD TO CART
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopDetails;
