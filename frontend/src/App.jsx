import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import FetchUsersDetails from "./utils/FetchUsersDetails";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "./store/UserSlice";
import Axios from "./utils/Axios";
import { setallcategory } from "./store/ProductSlice";
import { AddcartItem } from "./store/CartSlice";
import GlobalProvider from "./provier/GlobalProvider";

function App() {
  const dispatch = useDispatch();
  const fetchuser = async () => {
    const userdata = await FetchUsersDetails();
    // console.log("userdata", userdata);
    if (userdata?.data) {
      dispatch(setUserDetails(userdata.data));
    } else {
      console.log("No user found");
    }
  };

  const fetchallCategory = async () => {
    try {
      const res = await Axios({
        method: "GET",
        url: "/api/category/allcategory",
      });
      // console.log("res of fetch all category", res.data.data);
      // setCategoryData(res.data.data || []);
      dispatch(setallcategory(res.data.data));
    } catch (error) {
      console.error(error);
    }
  };

  const cart = useSelector((state) => state.cart.cart);

  useEffect(() => {
    fetchuser();
    fetchallCategory();
    // Fetchcartitems();
  }, []);

  console.log("carttt in store", cart);
  return (
    <GlobalProvider>
      <Header />
      <main className="min-h-[78vh]">
        <Outlet />
      </main>
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </GlobalProvider>
  );
}

export default App;
