import React from "react";
import { CiShoppingCart } from "react-icons/ci";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useGlobalCOntext } from "../provier/GlobalProvider";

const CartMobileHOver = () => {
  const { totalprice, totalquantity, setopencartmodel } = useGlobalCOntext();
  return (
    <div className="bg-green-700 px-4 py-2 rounded text-neutral-100 text-sm flex items-center justify-between lg:hidden">
      <div className="flex items-center gap-2">
        <div className="p-2 bg-green-600 rounded">
          <CiShoppingCart size={22} />
        </div>
        <div className="text-xs">
          <p>{totalquantity} items</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="text-xs">
          <p>₹{totalprice}</p>
        </div>
        <button
          onClick={() => setopencartmodel(true)}
          className="text-neutral-100 hover:text-neutral-300"
        >
          <FaArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default CartMobileHOver;
