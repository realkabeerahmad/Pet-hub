import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ShopDetails.css";
import axios from "axios";
import { Box, TextField } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
const ShopDetails = ({ Product, cart, setCart }) => {
  const Server = "http://localhost:8000/";
  const [values, setValues] = useState({
    quantity: 1,
  });
  const [qtyErr, setQtyErr] = useState({
    error: false,
    helperText: "Quantity must be more then 0 and Less the 100",
  });
  const handleChange = (value) => (e) => {
    setValues({ ...values, [value]: e.target.value });
    if ((qtyErr.error && values.quantity > 0) || values.quantity < 101) {
      setQtyErr({
        error: false,
        helperText: "Quantity must be more then 0 and Less the 100",
      });
    }
  };
  const onBlur = (e) => {
    if ((!qtyErr.error && values.quantity <= 0) || values.quantity >= 101) {
      setQtyErr({
        error: true,
        helperText: "Quantity must be more then 0 and Less the 100",
      });
    }
  };
  const addToCart = () => {
    if (qtyErr.error) {
      alert("Please Enter Valid Quantity");
      return false;
    }
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
        alert(res.data.message ? res.data.message : res.data.error);
        const data = { _id: cart._id };
        axios.post("http://localhost:8000/shop/getCart", data).then((res) => {
          alert(res.data.message);
          setCart(res.data.cart);
        });
      })
      .catch((err) => {
        alert(err);
        console.log("Not Done");
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
          <h1 style={{ maxWidth: "80%" }}>{Product.name.toUpperCase()}</h1>
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
          <TextField
            label="Quantity"
            id="quantity"
            name="quantity"
            color="success"
            value={values.quantity}
            onChange={handleChange("quantity")}
            type="number"
            min="0"
            max="100"
            onBlur={onBlur}
            error={qtyErr.error}
            helperText={qtyErr.helperText}
            sx={{ width: "30%", mt: 3 }}
          />
        </div>
        <div className="details-button">
          {/* <div className="details-fav">
            <i className="fa fa-heart"></i>
          </div>
          <div className="details-buyNow">BUY NOW</div> */}
          <Box
            className="details-addToCart"
            sx={{
              width: "100%",
              justifyContent: "center",
              backgroundColor: "red",
            }}
            onClick={addToCart}
          >
            <ShoppingCartIcon />
            &nbsp;&nbsp;ADD TO CART
          </Box>
        </div>
      </div>
    </div>
  );
};
export default ShopDetails;
