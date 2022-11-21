import { Box } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const CartItem = ({ product }) => {
  return (
    <Link to={"/product/" + product._id} style={{ color: "black" }}>
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
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              <h2>{product.name}</h2>
              <p>{product.price}</p>
            </Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              <p>{product.quantity}</p>
              <div>
                <i className="fa fa-heart"></i>
                <i className="fa fa-trash"></i>
              </div>
            </Box>
          </Box>
        </Box>
      </Box>
    </Link>
  );
};

export default CartItem;
