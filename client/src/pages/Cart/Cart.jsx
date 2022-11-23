import React, { useEffect, useState } from "react";
import axios from "axios";
import CartItem from "../../components/CartItem/CartItem";
import { Box, Button } from "@mui/material";

// --------------------------------------------------------

const Cart = ({ cart }) => {
  var subTotal = 0;
  var Total = 0;
  const shipping = 200;

  for (let index = 0; index < cart.products.length; index++) {
    subTotal = subTotal + cart.products[index].price;
  }
  Total = subTotal + shipping;
  return (
    <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
      <Box>
        <Box
          sx={{
            width: 700,
            backgroundColor: "white",
            m: 2,
            height: 40,
            boxShadow: "0 2px 4px #0000001a, 0 8px 16px #0000001a",
            borderRadius: 2,
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h2 style={{ color: "#e92e4a" }}>Cart</h2>
        </Box>
        {cart.products.map((product) => {
          return <CartItem product={product} />;
        })}
      </Box>
      <Box
        sx={{
          width: 480,
          background: "white",
          height: 300,
          borderRadius: 2,
          p: 2,
          m: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
        }}
      >
        <h2> Order Summary</h2>
        <Box>
          <Box
            sx={{
              width: "100%",
              p: 1,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <h3>Sub Total:</h3>
            <p>PKR {subTotal}</p>
          </Box>
          <Box
            sx={{
              width: "100%",
              p: 1,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <h3>Shipping fee:</h3>
            <p>PKR {shipping}</p>
          </Box>
          <Box
            sx={{
              width: "100%",
              p: 1,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <h3>Total:</h3>
            <p>PKR {Total}</p>
          </Box>
          <p>* Standard Shipping PKR 200 will be charged</p>
        </Box>
        <Box sx={{ position: "reletive" }}>
          <Button
            color="success"
            variant="contained"
            fullWidth
            sx={{ position: "absolute", bottom: 0, left: 0 }}
          >
            Proceed to Checkout
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Cart;
