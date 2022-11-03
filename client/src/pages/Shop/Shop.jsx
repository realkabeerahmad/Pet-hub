// import { Box, MenuItem, Select, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
// import { Link } from "react-router-dom";
import "./Shop.css";
import ShopCard from "../../components/ShopCard/ShopCard";

const Shop = ({ setProduct }) => {
  const [Products, setProducts] = useState([]);
  useEffect(() => {
    fetchItem();
  }, []);
  const fetchItem = () => {
    axios
      .get("http://localhost:8000/shop/showAllProducts/")
      .then((res) => {
        console.log(res.data.products);
        setProducts(res.data.products);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div className="shop">
        <div className="shopRow">
          {Products.map((Product) => {
            return (
              <ShopCard Product={Product} setProduct={setProduct}></ShopCard>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Shop;
