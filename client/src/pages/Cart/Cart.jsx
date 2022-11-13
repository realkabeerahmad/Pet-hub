import React, { useEffect, useState } from "react";
import axios from "axios";

const Cart = ({ user }) => {
  const [_Cart, setCart] = useState({});
  const data = { userId: user._id };
  useEffect(() => {
    fetchItem();
  }, []);
  const fetchItem = () => {
    axios
      .post("http://localhost:8000/shop/cart/", data)
      .then((res) => {
        console.log(res.data.products);
        setCart(res.data.products);
        console.log(_Cart);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return <div>Cart</div>;
};

export default Cart;
