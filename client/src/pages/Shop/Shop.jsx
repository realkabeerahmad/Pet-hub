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
        console.log(res);
        setProducts(res.data.products);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const product = {
    FastShipping: " dummy",
    Image: "fe7702c8-e15e-4b60-abae-aea769a03798-1662467836510.png",
    Link: " dummy_ dummy_ed3361f4-97a7-439e-8f68-9d3a7f56be95",
    Return: " dummy",
    StandardShipping: " dummy",
    Warranty: " dummy",
    createdAt: "2022-09-06T12:37:16.598Z",
    description: " dummy",
    name: " dummy",
    price: 120,
    quantity: 200,
    __v: 0,
    _id: "63173efc621caaf178b0decc",
  };
  return (
    <>
      <div className="shop">
        <div className="shopRow">
          {console.log(Products)}
          {Products.forEach((Product) => {
            <ShopCard Product={Product} setProduct={setProduct} />;
            console.log("This ", Product, "This");
          })}
          {/* <ShopCard Product={product} />
          <ShopCard Product={product} />
          <ShopCard Product={product} />
          <ShopCard Product={product} /> */}
        </div>
      </div>
    </>
  );
};

export default Shop;
