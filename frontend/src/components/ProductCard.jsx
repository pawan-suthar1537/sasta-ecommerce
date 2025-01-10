import { Edit, ShoppingCart, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import EditProductbyAdminModel from "./EditProductbyAdminModel";
import { toast } from "react-toastify";
import Axios from "../utils/Axios";

const ProductCard = ({ data, key, fetchAllProductData }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isopen, setisopen] = useState(false);

  const DeleteByID = async (id) => {
    try {
      const res = await Axios({
        method: "DELETE",
        url: "/api/product/delete",
        data: {
          _id: id,
        },
      });
      console.log("res ", res.data);
      if (res.data.success === true) {
        toast.success(res.data.message || "Deleted successfully");
        fetchAllProductData();
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message || "Failed to delete");
    }
  };

  useEffect(() => {
    setIsLoaded(true);
  }, []);
  console.log("data", data);
  return (
    <div>
      <div
        className={`w-full sm:w-64 p-4 rounded-lg bg-white shadow-lg transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-xl ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <div className="relative  mb-4 overflow-hidden rounded-md">
          {data?.image && data.image[0] ? (
            <img
              src={data.image[0]}
              alt={data?.name || "Product"}
              className="w-16 h-16 object-cover transition-transform duration-300 hover:scale-110"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">No image</span>
            </div>
          )}
          {data?.discount > 0 && (
            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
              {data.discount}% OFF
            </div>
          )}
        </div>
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">
          {data?.name || "Unnamed Product"}
        </h3>
        <div className="flex justify-between items-center mb-2">
          <p className="text-xl font-bold text-blue-600">
            ₹{data?.price?.toFixed(2) || "0.00"}
          </p>
          <p className="text-sm text-gray-500">per {data?.unit || "unit"}</p>
        </div>
        <p className="text-sm text-gray-600 mb-2">Stock: {data?.stock || 0}</p>
        <p className="text-sm text-gray-700 line-clamp-3 mb-4">
          {data?.description || "No description available"}
        </p>
        <div className="flex justify-between items-center">
          <div className="flex space-x-2 ">
            <button
              onClick={() => setisopen(true)}
              className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-300"
            >
              <Edit className="w-4 h-4 text-gray-600" />
            </button>
            <button
              onClick={() => DeleteByID(data?._id)}
              className="p-2 bg-gray-100 hover:bg-red-100 rounded-full transition-colors duration-300"
            >
              <Trash2 className="w-4 h-4 text-gray-600 hover:text-red-500" />
            </button>
          </div>
        </div>
      </div>
      {isopen && (
        <EditProductbyAdminModel
          initialData={data}
          close={() => setisopen(false)}
          fetchAllProductData={fetchAllProductData}
        />
      )}
    </div>
  );
};

export default ProductCard;
