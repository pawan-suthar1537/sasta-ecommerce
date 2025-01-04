import React from "react";

const ProductCard = ({ data, key }) => {
  console.log("data", data);
  return (
    <div className="w-36 p-2  rounded-md bg-blue-200">
      <div>
        <img src={data?.image[0]} alt={data?.name} className="w-full h-full" />
      </div>
      <p className="text-ellipsis line-clamp-2">{data?.name}</p>
      <p>{data?.price}</p>
      <p>{data?.unit}</p>
      <p>{data?.discount}</p>
      <p>{data?.stock}</p>
      <p className="text-ellipsis line-clamp-2">{data?.description}</p>
    </div>
  );
};

export default ProductCard;
