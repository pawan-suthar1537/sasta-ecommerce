import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Axios from "../utils/Axios";
import CardProduct from "./CardProduct";
import { FaChevronLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import { useSelector } from "react-redux";
import ValidUrlConvert from "../utils/URLconverter";

const CategoryWiseProductDisplay = ({ id, name }) => {
  console.log("_id", id);
  const [data, setdata] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const containerref = useRef();

  const allsubcategory = useSelector((state) => state.product.allsubcategory);

  const handleredirectproductlistpage = () => {
    console.log("catid", id);
    console.log("catname", name);
    const subcatdata = allsubcategory.find((sub) => {
      const filtersubcat = sub.category.some((el) => {
        return el._id == id;
      });
      return filtersubcat ? true : null;
    });
    console.log("subcatdata", subcatdata);

    if (subcatdata) {
      var url = "";
      url = `/${ValidUrlConvert(name)}-${id}/${ValidUrlConvert(
        subcatdata.name
      )}-${subcatdata._id}`;
    } else {
      url = `/${ValidUrlConvert(name)}/${id}`;
    }
    return url;
  };

  const redirecurll = handleredirectproductlistpage();

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

  const handlescrollRight = () => {
    containerref.current.scrollLeft += 200;
  };
  const handlescrollLeft = () => {
    containerref.current.scrollLeft -= 200;
  };

  return (
    <div>
      <div>
        <div className="mx-auto container max-w-7xl p-4 flex items-center justify-between gap-4">
          <h3 className="font-semibold text-lg md:text-xl">{name}</h3>
          <Link
            // onClick={handleredirectproductlistpage()}
            to={redirecurll}
            className="text-green-400 hover:text-green-200"
          >
            See All
          </Link>
        </div>
        {/* display category part */}
        <div className="relative flex items-center ">
          <div
            className="flex gap-4 md:gap-6 lg:gap-8 container mx-auto p-2 overflow-x-scroll scrollbar-none scroll-smooth"
            ref={containerref}
          >
            {data.map((p, index) => {
              return <CardProduct key={index} data={p} />;
            })}

            {/* buttons */}
          </div>
          {data.length > 5 && (
            <div className="w-full left-0 right-0 container mx-auto px-2 absolute flex justify-between items-center max-w-full hidden md:flex">
              <button
                onClick={handlescrollLeft}
                className="z-10 bg-white p-1 rounded-full shadow-md text-lg"
              >
                <FaChevronLeft />
              </button>
              <button
                onClick={handlescrollRight}
                className="z-10 bg-white p-1 rounded-full shadow-md text-lg"
              >
                <FaAngleRight />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryWiseProductDisplay;
