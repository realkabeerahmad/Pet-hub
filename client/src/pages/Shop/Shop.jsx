import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Shop.css";
import ShopCard from "../../components/ShopCard/ShopCard";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SwipeableDrawer,
  TextField,
} from "@mui/material";

const Shop = ({ setProduct }) => {
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  console.log("shop");
  const [Products, setProducts] = useState([]);
  useEffect(() => {
    fetchItem();
  }, []);
  const fetchItem = () => {
    axios
      .get("http://localhost:8000/shop/showAllProducts")
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
      <div className="shop-nav">
        <button onClick={toggleDrawer("left", true)}>
          <i className="fa fa-filter"></i>
          &nbsp; &nbsp;Filter
        </button>
        <SwipeableDrawer
          anchor={"left"}
          open={state["left"]}
          onClose={toggleDrawer("left", false)}
          onOpen={toggleDrawer("left", true)}
        >
          <Box
            sx={{
              width: "350px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h1>Filters</h1>
            <FormControl sx={{ width: "80%", m: 2 }}>
              <InputLabel id="type" color="success">
                Category
              </InputLabel>
              <Select label="Category">
                <MenuItem>Food</MenuItem>
                <MenuItem>Accessory</MenuItem>
                <MenuItem>Toys</MenuItem>
                <MenuItem>Cloths</MenuItem>
                <MenuItem>Cloths</MenuItem>
              </Select>
            </FormControl>
            <TextField
              sx={{
                width: "80%",
                m: 2,
              }}
            ></TextField>
            <TextField
              sx={{
                width: "80%",
                m: 1,
              }}
            ></TextField>
          </Box>
        </SwipeableDrawer>
        <div className="shop-search">
          {/* <form onSubmit={false}> */}
          <TextField
            variant="outlined"
            color="error"
            sx={{
              width: "100%",
              m: 1,
              mr: 0,
            }}
            type="text"
            label="Search"
            placeholder="Search"
          />
          <button>
            <i className="fa fa-search"></i>
          </button>
          {/* </form> */}
        </div>
      </div>
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
