import React, { useEffect, useState } from "react";
import axios from "axios";
import CartItem from "../../components/CartItem/CartItem";

const Cart = ({ cart }) => {
  const [Price, setPrice] = useState(0);
  // useEffect(() => {
  //   totalPrice();
  // }, []);

  const totalPrice = () => {
    cart.products.map((element) => {
      setPrice(Price + Number(element.price));
    });
    console.log(Price);
  };

  return (
    <div>
      {cart.products.map((product) => {
        return <CartItem product={product} />;
      })}
      <button onClick={totalPrice}>Click me</button>
    </div>
  );
};

export default Cart;
