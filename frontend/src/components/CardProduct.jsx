import React from "react";
import { Link } from "react-router-dom";
import ValidUrlConvert from "../utils/URLconverter";
import { useState } from "react";
import { toast } from "react-toastify";
import Axios from "../utils/Axios";
import { useGlobalCOntext } from "../provier/GlobalProvider";
import AddtoCartButton from "./AddtoCartButton";

const CardProduct = ({ data }) => {
  let url = `/product/${ValidUrlConvert(data?.name)}-${data?._id}`;

  return (
    <div className="border grid  lg:p-4  gap-2 lg:gap-3 max-w-52 lg:min-w-52 rounded">
      <Link
        to={url}
        className=" w-full  max-h-24 lg:max-h-32  min-h-20 rounded overflow-hidden"
      >
        <img src={data?.image[0]} alt={data?.name} className="w-full h-full" />
      </Link>
      <div className=" rounded w-fit text-xs p-1 px-2 text-green-600 bg-green-300">
        10 min
      </div>
      <div className=" px-1 lg:px-0 font-medium text-sm lg:text-base text-ellipsis line-clamp-2">
        {data?.name}
      </div>
      <div className="w-fit px-2 text-sm lg:text-base lg:px-0 ">
        {data?.unit}
      </div>
      <div className=" px-2 flex items-center justify-between gap-3 text-sm lg:text-base">
        <div className=" font-semibold ">₹{data.price}</div>
        <div className="">
          {data.stock === 0 ? (
            <button
              disabled
              className="bg-red-400 text-white px-4 py-1 rounded text-wrap"
            >
              stock out
            </button>
          ) : (
            <AddtoCartButton data={data} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CardProduct;
