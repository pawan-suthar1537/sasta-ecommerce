import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Axios from "../utils/Axios";
import CardProduct from "./CardProduct";
import { FaChevronLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";

const CategoryWiseProductDisplay = ({ id, name }) => {
  console.log("_id", id);
  const [data, setdata] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProductbycategory = async () => {
    try {
      setIsLoading(true);

      const res = await Axios({
        method: "POST",
        url: `/api/product/getbyid`,
        data: { _id: id },
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("res of product by category", res.data);
      if (!res.data.success === true) {
        toast.error(res.data.message || "Failed to fetch product by category");
        return;
      }
      setdata(res.data.data);
    } catch (error) {
      setIsLoading(false);

      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProductbycategory();
  }, []);

  console.log("data", data);

  return (
    <div>
      <div>
        <div className="mx-auto container max-w-7xl p-4 flex items-center justify-between gap-4">
          <h3 className="font-semibold text-lg md:text-xl">{name}</h3>
          <Link to={""} className="text-green-400 hover:text-green-200">
            See All
          </Link>
        </div>
        {/* display category part */}
        <div className="flex items-center  gap-4 md:gap-6 lg:gap-8 container mx-auto p-2 overflow-hidden">
          {data.map((p, index) => {
            return <CardProduct key={index} data={p} />;
          })}

          {/* buttons */}
          <div className="w-full left-0 right-0 container mx-auto  px-2 absolute hidden lg:flex justify-between max-w-full">
            <button className="z-10  left-28 relative bg-white p-1 rounded-full shadow-md text-lg">
              <FaChevronLeft />
            </button>
            <button className="z-10 relative bg-white p-1 rounded-full shadow-md text-lg">
              <FaAngleRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryWiseProductDisplay;
