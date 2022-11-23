import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Shop.css";
import ShopCard from "../../components/ShopCard/ShopCard";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SwipeableDrawer,
  TextField,
} from "@mui/material";
import { FilterList, Search } from "@mui/icons-material";

// ----------------------------------------------------------

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
      <Box
        sx={{
          width: "100%",
          p: 2,
          backgroundColor: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: "20%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button color="error" onClick={toggleDrawer("left", true)}>
            <FilterList />
            &nbsp; &nbsp;Filter
          </Button>
        </Box>
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
        <Box sx={{ width: "80%", display: "flex" }}>
          <TextField
            variant="outlined"
            color="error"
            sx={{
              width: "60%",
            }}
            type="text"
            placeholder="Search"
          />
          <Button
            color="error"
            variant="contained"
            sx={{ width: 50, ml: "-65px" }}
          >
            <Search />
          </Button>
          {/* </form> */}
        </Box>
      </Box>
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
