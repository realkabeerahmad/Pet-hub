import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, TextField } from "@mui/material";
import { ShoppingCartCheckout } from "@mui/icons-material";
import StripeCheckout from "react-stripe-checkout";
// --------------------------------------------------------

const CheckOut = ({ cart, setCart, user }) => {
  const [values, setValues] = useState({
    fullName: "",
    address: "",
    phoneNumber: "",
  });
  const handleChange = (value) => (e) => {
    setValues({ ...values, [value]: e.target.value });
  };
  var subTotal = 0;
  var Total = 0;
  const shipping = 200;

  for (let index = 0; index < cart.products.length; index++) {
    subTotal =
      subTotal + cart.products[index].price * cart.products[index].quantity;
  }
  if (subTotal != 0) {
    Total = subTotal + shipping;
  }
  const checkOut = () => {
    if (cart.products.length <= 0) {
      alert("Cart Empty");
      return false;
    }
    const data = {
      userId: user._id,
      Name: user.firstName + " " + user.lastName,
      Address: values.address,
      Phone: values.phoneNumber,
      ShippingFee: shipping,
      TotalAmount: subTotal,
      products: cart.products,
      cartId: cart._id,
    };
    axios
      .post("http://localhost:8000/shop/checkOut", data)
      .then((res) => {
        alert(res.data.status);
        const data = { _id: cart._id };
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
        alert(err);
      });
  };
  const handleToken = (totalAmount, token) => {
    try {
      axios.post("http://localhost:8000/shop/payment", {
        tokey: token.id,
        amount: totalAmount,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const tokenHandler = (token) => {
    handleToken(Total, token);
  };
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
          <h2
            style={{
              color: "#e92e4a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ShoppingCartCheckout sx={{ mr: 2 }} />
            Check Out
          </h2>
        </Box>
        <Box
          sx={{
            width: 700,
            backgroundColor: "white",
            m: 2,
            // height: 40,
            boxShadow: "0 2px 4px #0000001a, 0 8px 16px #0000001a",
            borderRadius: 2,
            p: 2,
            // display: "flex",
            // alignItems: "center",
            // justifyContent: "center",
          }}
        >
          <TextField
            label="Full Name"
            variant="outlined"
            color="success"
            name=""
            type="text"
            sx={{ width: "47.5%", m: 1 }}
            value={values.fullName}
            onChange={handleChange("fullName")}
            required
          />
          <TextField
            label="Address"
            variant="outlined"
            color="success"
            name=""
            type="text"
            sx={{ width: "47.5%", m: 1 }}
            value={values.address}
            onChange={handleChange("address")}
            required
          />
          <TextField
            label="Phone Numer"
            variant="outlined"
            color="success"
            name=""
            type="number"
            sx={{ width: "47.5%", m: 1 }}
            value={values.phoneNumber}
            onChange={handleChange("phoneNumber")}
            required
          />
          {/* <PaymentElement /> */}
          {/* <StripeCheckout
            stripKey="pk_test_51M7jqtILXO2OeSWiTvBQrAP6ZAZjVZ7X7DBEIYe73yvn1l7FjCL446745e2uDvuWOxVLFnmVZKEGmVg53SGEUuKx00LnkAidtZ"
            token={tokenHandler}
          ></StripeCheckout> */}
          <Box sx={{ width: "100%" }}>
            <TextField
              label="Phone Numer"
              variant="outlined"
              color="success"
              name=""
              type="number"
              sx={{ width: "47.5%", m: 1 }}
              value={values.phoneNumber}
              onChange={handleChange("phoneNumber")}
              required
            />
          </Box>
        </Box>
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
          <p>* Standard Shipping PKR 200 will be applied.</p>
        </Box>
        <Box sx={{ position: "reletive" }}>
          <Button
            color="success"
            variant="contained"
            fullWidth
            onClick={checkOut}
            sx={{ position: "absolute", bottom: 0, left: 0 }}
          >
            Proceed
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CheckOut;
