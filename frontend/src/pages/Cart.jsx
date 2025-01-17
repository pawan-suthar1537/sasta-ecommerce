import React, { useState } from "react";
import CartModel from "../components/CartModel";
import { useGlobalCOntext } from "../provier/GlobalProvider";

const Cart = () => {
  const { totalprice, totalquantity, opencartmodel, setopencartmodel } =
    useGlobalCOntext();

  return (
    <div>
      {opencartmodel && <CartModel close={() => setopencartmodel(false)} />}
    </div>
  );
};

export default Cart;
