import React, { useEffect, useState } from "react";
import axios from "axios";

const Cart = ({ cart }) => {
  console.log(cart);
  return (
    <div>
      {cart.products.map((p) => {
        return <>{p}</>;
      })}
    </div>
  );
};

export default Cart;
