import Search from "./Search";
import { Link, useNavigate } from "react-router-dom";
import { CiShoppingCart } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { AccountDropdown } from "./Accountdropdown";
import { toast } from "react-toastify";
import Axios from "../utils/Axios";
import { logout } from "../store/UserSlice";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user);
  console.log("user in store", user);
  const dispatch = useDispatch();

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
    <header className=" h-28 lg:h-16  sticky top-0 flex  flex-col justify-center gap-1 bg-white">
      <div className="container flex mx-auto items-center justify-between px-4">
        {/* logo */}
        <Link to="/" className="h-full">
          <div className="h-full flex justify-center items-center">
            <img
              src="https://www.rewardone.in/wp-content/uploads/2024/05/b4a0607481.png"
              alt="logo"
              width={110}
              height={60}
            />
          </div>
        </Link>
        {/* serch */}
        <div className="hidden lg:block">
          <Search />
        </div>
        {/* cart */}
        <div className="">
          {/*  user icon on mobile device */}
          <button className="lg:hidden">
            <AccountDropdown
              ismobile={true}
              user={user}
              onLogout={handleLogout}
            />
          </button>
          {/* login and cart on desktop */}
          <div className="hidden md:flex items-center justify-center h-full items-center gap-10">
            {user?._id ? (
              <AccountDropdown user={user} onLogout={handleLogout} />
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="mx-2 px-2 text-lg"
              >
                login
              </button>
            )}

            <button className="flex items-center justify-center gap-2 bg-secondary px-2 py-[9px] rounded text-white">
              <div className="animate-bounce">
                <CiShoppingCart size={28} />
              </div>
              <div>my cart</div>
            </button>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 lg:hidden">
        <Search />
      </div>
    </header>
  );
};

export default Header;
