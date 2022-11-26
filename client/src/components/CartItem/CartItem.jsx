import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { Add, Remove } from "@mui/icons-material";

// -------------------------------------------------

const CartItem = ({ product, cartId, setCart }) => {
  var [quantity, setQuantity] = useState(product.quantity);
  const handleChange = (e) => {
    setQuantity(e.target.value);
  };
  const decr = () => {
    if (quantity >= 0) {
      setQuantity(quantity - 1);
      console.log(quantity);
      updateQuantity(quantity + 1);
    } else {
      return false;
    }
  };
  const incr = () => {
    if (quantity <= 5) {
      setQuantity(quantity + 1);
      console.log(quantity);
      updateQuantity(quantity + 1);
    } else {
      return false;
      // updateQuantity();
    }
  };
  const deleteProduct = () => {
    const data = { cartId: cartId, _id: product._id };
    axios
      .post("http://localhost:8000/shop/deleteFromCart/", data)
      .then((res) => {
        alert(res.data.message ? res.data.message : res.data.error);
        const data = { _id: cartId };
        axios
          .post("http://localhost:8000/shop/getCart", data)
          .then((r) => {
            alert(r.data.message ? r.data.message : r.data.error);
            setCart(r.data.cart);
          })
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const updateQuantity = ({ quantity }) => {
    const data = { cartId: cartId, _id: product._id, quantity: quantity };
    // console.log(quantity);
    axios
      .post("http://localhost:8000/shop/updateQuantity/", data)
      .then((res) => {
        alert(res.data.message ? res.data.message : res.data.error);
        const data = { _id: cartId };
        axios
          .post("http://localhost:8000/shop/getCart", data)
          .then((r) => {
            alert(r.data.message ? r.data.message : r.data.error);
            setCart(r.data.cart);
          })
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //---------------------------------------------------------------
  return (
    <Box sx={{ position: "relative" }}>
      <Box
        sx={{
          width: 700,
          backgroundColor: "white",
          m: 2,
          height: 180,
          boxShadow: "0 2px 4px #0000001a, 0 8px 16px #0000001a",
          borderRadius: 2,
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: 150,
            height: 150,
            contain: "content",
            display: "flex",
            aliginItems: "center",
            justifyContent: "center",
            backgroundColor: "#00000010",
          }}
        >
          <img
            src={"http://localhost:8000/" + product.Image}
            alt=""
            style={{ width: "100%" }}
          />
        </Box>
        <Box sx={{ width: "80%", p: 2 }}>
          <Box
            sx={{
              width: "100%",
              height: 150,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "column",
            }}
          >
            <Link
              to={"/product/" + product._id}
              style={{ color: "black", width: "100%" }}
            >
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexDirection: "row",
                }}
              >
                <h2>{product.name.slice(0, 20)}.....</h2>
                <p>PKR {product.price}</p>
              </Box>
            </Link>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              <p>
                <b>Quantity:</b>&nbsp;&nbsp;
                <Button onClick={incr}>
                  <Add sx={{ p: 0, fontSize: 15 }} />
                </Button>
                <input
                  className="quantity"
                  type="number"
                  min="1"
                  max="5"
                  value={quantity}
                  onChange={handleChange}
                  // onBlur={onBlur}
                  disabled
                />
                <Button onClick={decr}>
                  <Remove sx={{ p: 0, fontSize: 15 }} />
                </Button>
                {product.quantity}
              </p>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          position: "absolute",
          bottom: 10,
          right: 40,
          transition: "color 0.5s",
          cursor: "pointer",
        }}
        onClick={deleteProduct}
        className="del-btn"
      >
        <DeleteIcon />
      </Box>
    </Box>
  );
};

export default CartItem;
