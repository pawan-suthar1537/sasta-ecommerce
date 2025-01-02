import React from "react";

const CardProduct = ({ data }) => {
  return (
    <div className="border grid p-4 gap-3 max-w-52 lg:min-w-52 rounded">
      <div className="max-h-32  min-h-20 rounded">
        <img src={data?.image[0]} alt={data?.name} className="w-full h-full" />
      </div>
      <div className=" rounded w-fit text-sm p-1 px-2 text-green-600 bg-green-300">
        10 min
      </div>
      <div className="font-semibold font-medium text-ellipsis line-clamp-2">
        {data?.name}
      </div>
      <div className="w-fit ">{data?.unit}</div>
      <div className="flex items-center justify-between gap-3">
        <div className=" font-semibold">₹{data.price}</div>
        <div className="">
          <button className="bg-green-600 text-white px-4 py-1 rounded">
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardProduct;
