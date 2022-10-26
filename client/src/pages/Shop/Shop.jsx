import { Box, MenuItem, Select, TextField } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "./Shop.css";
import ShopCard from "../../components/ShopCard/ShopCard";

const Shop = () => {
  return (
    <>
      <div className="shop">
        <div className="shopRow">
          <ShopCard></ShopCard>
          <ShopCard></ShopCard>
          <ShopCard></ShopCard>
          <ShopCard></ShopCard>
          <ShopCard></ShopCard>
          <ShopCard></ShopCard>
        </div>
      </div>
    </>
  );
};

export default Shop;
