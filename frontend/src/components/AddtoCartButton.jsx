import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Axios from "../utils/Axios";

import { FaPlus, FaMinus } from "react-icons/fa";
import { useGlobalCOntext } from "../provier/GlobalProvider";

const AddtoCartButton = ({ data }) => {
  const { Fetchcartitems, UpdateCartItemQTY } = useGlobalCOntext();
  const [loading, setLoading] = useState(false);
  const [padded, setpadded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [cartitemdetails, setcartitemdetails] = useState();

  const cart = useSelector((state) => state.cart.cart);
  console.log("cart at AddtoCartButton", cart);

  const HandleAddtoCart = async () => {
    try {
      setLoading(true);
      const res = await Axios({
        method: "POST",
        url: "/api/cart/addtocart",
        data: {
          productId: data?._id,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
        },
      });
      console.log("res HandleAddtoCart ", res.data);
      if (res.data.success === true) {
        toast.success(res.data.message || "Added to cart successfully");
        if (Fetchcartitems) {
          Fetchcartitems();
        }
        setLoading(false);
      } else {
        toast.error(res.data.message || "Failed to add to cart");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.response.data.message || "Failed to add to cart");
    } finally {
      console.log("finally");
      setLoading(false);
    }
  };

  const HandleIncrement = async (e) => {
    e.preventDefault();
    UpdateCartItemQTY(cartitemdetails?._id, quantity + 1);
  };

  const HandleDecrement = async (e) => {
    e.preventDefault();
    UpdateCartItemQTY(cartitemdetails?._id, quantity - 1);
  };

  // Checking if the product is added to the cart or not
  useEffect(() => {
    if (cart.length > 0 && data?._id) {
      const cartItem = cart.find((item) => item?.productId?._id === data?._id);
      if (cartItem) {
        setpadded(true);
        setQuantity(cartItem.quantity);
        setcartitemdetails(cartItem);
      } else {
        setpadded(false);
        setQuantity(0);
      }
    } else {
      setpadded(false);
      setQuantity(0);
    }
  }, [cart, data]);

  return (
    <div className="flex items-center">
      {padded ? (
        <>
          <button
            onClick={HandleDecrement}
            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-300"
          >
            <FaMinus />
          </button>
          <span className="mx-2">{quantity}</span>
          <button
            onClick={HandleIncrement}
            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-300"
          >
            <FaPlus />
          </button>
        </>
      ) : (
        <button
          onClick={HandleAddtoCart}
          className="p-2 bg-green-500 text-white rounded-full transition-colors duration-300"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add to Cart"}
        </button>
      )}
    </div>
  );
};

export default AddtoCartButton;
