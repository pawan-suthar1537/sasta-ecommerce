import { createContext, useContext, useEffect } from "react";
import Axios from "../utils/Axios";
import { useDispatch } from "react-redux";
import { AddcartItem } from "../store/CartSlice";

export const GlobalContext = createContext(null);

export const useGlobalCOntext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const dispatch = useDispatch();
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
  useEffect(() => {
    Fetchcartitems();
  }, []);
  return (
    <GlobalContext.Provider value={{ Fetchcartitems }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
