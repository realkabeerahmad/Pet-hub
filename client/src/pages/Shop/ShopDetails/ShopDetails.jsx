import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ShopDetails.css";
import axios from "axios";

const ShopDetails = ({ Product, cart }) => {
  const Server = "http://localhost:8000/";
  const [values, setValues] = useState({
    quantity: "",
  });
  const handleChange = (value) => (e) => {
    setValues({ ...values, [value]: e.target.value });
  };
  const addToCart = () => {
    const data = {
      cartId: cart._id,
      _id: Product._id,
      name: Product.name,
      image: Product.Image,
      quantity: values.quantity,
      price: Product.price,
    };
    axios
      .post("http://localhost:8000/shop/addToCart", data)
      .then((res) => {
        alert(res.message);
      })
      .catch((err) => {
        alert(err);
      });
  };
  return (
    <div className="Details">
      <div className="Details-Left">
        <Link to="/shop">
          <i className="fa fa-arrow-left"></i>
        </Link>
        <img src={Server + Product.Image} alt={Product._id} />
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
              <tr>
                <th>
                  <label htmlFor="quantity">Quantity:</label>
                </th>
                <td>
                  <input
                    id="quantity"
                    name="quantity"
                    value={values.quantity}
                    onChange={handleChange("quantity")}
                    type="number"
                    min={0}
                  />
                </td>
                <th></th>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="details-button">
          <div className="details-fav">
            <i className="fa fa-heart"></i>
          </div>
          <div className="details-buyNow">BUY NOW</div>
          <div className="details-addToCart" onClick={addToCart}>
            <i className="fa fa-shopping-cart"></i> ADD TO CART
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopDetails;
