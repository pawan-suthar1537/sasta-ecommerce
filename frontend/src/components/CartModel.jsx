import React from "react";
import { IoClose } from "react-icons/io5";
import CartMobileHOver from "./CartMobileHOver";
import { useGlobalCOntext } from "../provier/GlobalProvider";
import { useSelector } from "react-redux";

const CartModel = ({ close }) => {
  const { totalprice } = useGlobalCOntext();
  const cart = useSelector((state) => state.cart.cart);
  console.log("cart at cart model", cart);
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-end transition-opacity duration-300 ease-in-out">
      <div className="w-80 bg-white h-full shadow-lg p-4 transform transition-transform duration-300 ease-in-out translate-x-0">
        <button
          onClick={close}
          className="text-right text-gray-500 hover:text-gray-700"
        >
          <IoClose size={28} />
        </button>
        <h2 className="text-xl font-bold mb-4">Your Cart</h2>
        <ul className="mb-4">
          {/* Replace with dynamic cart items */}
          {cart[0] &&
            cart.map((item, index) => {
              console.log(item, "item");
              return (
                <div key={index}>
                  <li className="flex justify-between items-center mb-2">
                    
                    <span>{item?.productId?.name}</span>
                    <span>₹{item?.productId?.price}</span>
                  </li>
                </div>
              );
            })}

          {/* Add more items as needed */}
        </ul>
        <button className=" w-full bg-secondary text-white py-2 rounded">
          Pay ₹:{totalprice}
        </button>
        {/* <CartMobileHOver hide={false} /> */}
      </div>
    </div>
  );
};

export default CartModel;
