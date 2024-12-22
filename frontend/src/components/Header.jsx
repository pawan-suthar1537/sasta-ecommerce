import Search from "./Search";
import { Link, useNavigate } from "react-router-dom";
import { CiUser } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className=" h-28 lg:h-16  sticky top-0 flex  flex-col justify-center gap-1">
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
            <CiUser size={28} />
          </button>
          {/* login and cart on desktop */}
          <div className="hidden md:flex items-center justify-center h-full items-center gap-10">
            <button
              onClick={() => navigate("/login")}
              className="mx-2 px-2 text-lg"
            >
              login
            </button>
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
