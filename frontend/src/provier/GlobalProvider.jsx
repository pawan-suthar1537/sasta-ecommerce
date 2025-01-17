import { createContext, useContext, useEffect, useState } from "react";
import Axios from "../utils/Axios";
import { useDispatch, useSelector } from "react-redux";
import { AddcartItem } from "../store/CartSlice";
import { toast } from "react-toastify";

export const GlobalContext = createContext(null);

export const useGlobalCOntext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const [totalprice, settotalprice] = useState(0);
  const [totalquantity, settotalquantity] = useState(0);
  const Fetchcartitems = async () => {
    try {
      const res = await Axios({
        method: "GET",
        url: "/api/cart/getmycart",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
        },
      });
      console.log("res of fetch cart items", res.data);
      if (res.data.success === true) {
        console.log("res.data.data", res.data.data);
        dispatch(AddcartItem(res.data.data));
      } else {
        console.log("res.data.data", res.data.data);
        // dispatch(setallcartitems([]));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const UpdateCartItemQTY = async (id, qty) => {
    try {
      const res = await Axios({
        method: "PUT",
        url: "/api/cart/updatecart",
        data: {
          cartId: id,
          quantity: qty,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
        },
      });
      console.log("res of IncQTY", res.data);
      if (res.data.success === true) {
        toast.success(res.data.message || "Quantity updated successfully");
        console.log("res.data.data", res.data.data);
        Fetchcartitems();
      } else {
        console.log("res.data.data", res.data.data);
        // dispatch(setallcartitems([]));
      }
    } catch (error) {
      console.error(error);
      // toast.error(error.response.data.message || "Failed to update quantity");
    }
  };

  const DeleteCart = async (cartId) => {
    try {
      const res = await Axios({
        method: "DELETE",
        url: "/api/cart/delete",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
        },
        data: {
          cartId: cartId,
        },
      });
      console.log("res of DeleteCart", res.data);
      if (res.data.success === true) {
        Fetchcartitems();
        toast.success(res.data.message || "Cart deleted successfully");
      } else {
        console.log("res.data.data", res.data.data);
        // dispatch(setallcartitems([]));
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message || "Failed to delete cart");
    }
  };

  useEffect(() => {
    Fetchcartitems();
  }, []);
  useEffect(() => {
    // Calculate total quantity
    const totalqty = cart.reduce((total, item) => total + item.quantity, 0);
    settotalquantity(totalqty);

    // Calculate total price
    const totalprice = cart.reduce(
      (prev, curr) => prev + curr.productId.price * curr.quantity,
      0
    );
    settotalprice(totalprice);
  }, [cart]);
  return (
    <GlobalContext.Provider
      value={{
        Fetchcartitems,
        UpdateCartItemQTY,
        DeleteCart,
        totalprice,
        totalquantity,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
