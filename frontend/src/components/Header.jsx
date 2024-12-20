import Search from "./Search";
import { Link } from "react-router-dom";
import { CiUser } from "react-icons/ci";

const Header = () => {
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
          <button className="lg:hidden">
            <CiUser size={28} />
          </button>
          <div className="hidden md:flex items-center justify-center h-full">
            cart
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
