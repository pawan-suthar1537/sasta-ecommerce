import React from "react";
import { LuSearch } from "react-icons/lu";
import { TypeAnimation } from "react-type-animation";
import { Link, useLocation } from "react-router-dom";

const Search = () => {
  const location = useLocation();
  const isserchpage = location.pathname === "/search";
  return (
    <div className="w-full  min-w-[250px] lg:min-w-[400px] h-11 lg:h-12 rounded-md border overflow-hidden flex items-center bg-slate-50 ">
      <button className="flex justify-center items-center p-3 h-full text-neutral-600">
        <LuSearch size={20} />
      </button>
      <div className="w-full h-full">
        {!isserchpage ? (
          <Link to="/search">
            <div className="w-full h-full flex items-center justify-center">
              <TypeAnimation
                sequence={[
                  // Same substring at the start will only be typed out once, initially
                  "We produce food for Mice",
                  1000, // wait 1s before replacing "Mice" with "Hamsters"
                  "We produce food for Hamsters",
                  1000,
                  "We produce food for Guinea Pigs",
                  1000,
                  "We produce food for Chinchillas",
                  1000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </div>
          </Link>
        ) : (
          <div className="w-full h-full">
            <input
              type="text"
              placeholder="searchinggg"
              autoFocus
              className="bg-transparent w-full h-full outline-none"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
