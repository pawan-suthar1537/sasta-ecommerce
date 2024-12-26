import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import SearchPage from "../pages/SearchPage";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Forgotpassword from "../pages/Forgotpassword";
import VerifyOTP from "../pages/VerifyOTP";
import Resetpassord from "../pages/Resetpassord";
import Dashboard from "../laout/Dashboard";
import Profile from "../pages/Profile";
import MyOrders from "../pages/MyOrders";
import Address from "../pages/Address";
import Category from "../pages/Category";
import SubCategory from "../pages/SubCategory";
import AllProduct from "../pages/AllProduct";
import AddProduct from "../pages/AddProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "forgot-password",
        element: <Forgotpassword />,
      },
      {
        path: "verify-otp",
        element: <VerifyOTP />,
      },
      {
        path: "password-reset",
        element: <Resetpassord />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
        children: [
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "myorder",
            element: <MyOrders />,
          },
          {
            path: "address",
            element: <Address />,
          },
          {
            path: "category",
            element: <Category />,
          },
          {
            path: "subcategory",
            element: <SubCategory />,
          },
          {
            path: "allproduct",
            element: <AllProduct />,
          },
          {
            path: "addproduct",
            element: <AddProduct />,
          },
        ],
      },
    ],
  },
]);

export default router;
