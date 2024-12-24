import { Link, Outlet, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { CiSettings } from "react-icons/ci";
import Axios from "../utils/Axios";
import { useDispatch } from "react-redux";
import { logout } from "../store/UserSlice";
import { toast } from "react-toastify";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
        <div className="bg-gray-100 p-4 h-full">
          <div className="space-y-4">
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
              <CiSettings className="w-5 h-5" />
              <span>My Order</span>
            </Link>
            <Link
              to="/dashboard/address"
              className="block text-gray-700 hover:bg-gray-200 p-2 rounded flex items-center gap-2"
            >
              <CiSettings className="w-5 h-5" />
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
        <div className="bg-white p-4">
          {/* Right side content goes here */}
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
