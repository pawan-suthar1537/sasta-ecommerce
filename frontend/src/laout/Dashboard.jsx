import { Link, Outlet, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";

import Axios from "../utils/Axios";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/UserSlice";
import { toast } from "react-toastify";
import { BiCategoryAlt } from "react-icons/bi";
import { TiFlowChildren } from "react-icons/ti";
import { GrDatabase } from "react-icons/gr";
import { IoMdAdd } from "react-icons/io";
import { CiShoppingCart } from "react-icons/ci";
import { ImAddressBook } from "react-icons/im";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const handleLogout = async () => {
    try {
      const res = await Axios({
        method: "GET",
        url: "/api/user/logout",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
        },
      });
      console.log("res of logout", res);
      if (res.data.success === true) {
        dispatch(logout());
        localStorage.removeItem("accesstoken");
        localStorage.removeItem("refreshtoken");
        navigate("/login");
        toast.success("successfully logged out!");
      } else {
        toast.error("Failed to log out. Please try again!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to log out. Please try again!");
    }
  };
  return (
    <section>
      <div className="container mx-auto grid grid-cols-[100px,1fr] lg:grid-cols-[250px,1fr] min-h-[82vh]">
        {/* Left menu */}
        <div className=" p-1 h-full border-r overflow-y-auto max-h-[calc(100vh-96px)]">
          <div className="space-y-4">
            <p className="block text-gray-700 text-center w-full rounded flex items-center gap-2">
              {user?.role.toLowerCase() === "ADMIN" ? "Admin" : "User"}
            </p>
            <Link
              to="/dashboard/category"
              className="block text-gray-700 hover:bg-gray-200 p-2 rounded flex items-center gap-2"
            >
              <BiCategoryAlt className="w-5 h-5" />
              <span>Category</span>
            </Link>
            <Link
              to="/dashboard/subcategory"
              className="block text-gray-700 hover:bg-gray-200 p-2 rounded flex items-center gap-2"
            >
              <TiFlowChildren className="w-5 h-5" />
              <span>Sub Category</span>
            </Link>
            <Link
              to="/dashboard/allproduct"
              className="block text-gray-700 hover:bg-gray-200 p-2 rounded flex items-center gap-2"
            >
              <GrDatabase className="w-5 h-5" />
              <span>All Product</span>
            </Link>
            <Link
              to="/dashboard/addproduct"
              className="block text-gray-700 hover:bg-gray-200 p-2 rounded flex items-center gap-2"
            >
              <IoMdAdd className="w-5 h-5" />
              <span>Add Product</span>
            </Link>
            <Link
              to="/dashboard/profile"
              className="block text-gray-700 hover:bg-gray-200 p-2 rounded flex items-center gap-2"
            >
              <FaUser className="w-5 h-5" />
              <span>Profile</span>
            </Link>

            <Link
              to="/dashboard/myorder"
              className="block text-gray-700 hover:bg-gray-200 p-2 rounded flex items-center gap-2"
            >
              <CiShoppingCart className="w-5 h-5" />
              <span>My Order</span>
            </Link>
            <Link
              to="/dashboard/address"
              className="block text-gray-700 hover:bg-gray-200 p-2 rounded flex items-center gap-2"
            >
              <ImAddressBook className="w-5 h-5" />
              <span>My Address</span>
            </Link>

            <button
              onClick={handleLogout}
              className="block text-red-600 hover:bg-gray-200 p-2 rounded flex items-center gap-2 w-full text-left"
            >
              <IoLogOutOutline className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Right content */}
        <div className=" p-4">
          {/* Right side content goes here */}
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
