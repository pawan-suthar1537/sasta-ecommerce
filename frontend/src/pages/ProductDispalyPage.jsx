import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import { useParams } from "react-router-dom";
import Axios from "../utils/Axios";
import { toast } from "react-toastify";

const ProductDisplayPage = () => {
  const params = useParams();
  const [product, setProduct] = useState({
    image: [],
    name: "",
    price: "",
    description: "",
    stock: 0,
    unit: "",
  });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const productid = params?.productid?.split("-").slice(-1)[0];

  const FetchProductDetails = async () => {
    try {
      const res = await Axios({
        method: "POST",
        url: `/api/product/getDetails`,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          _id: productid,
        },
      });
      // console.log("res", res.data.data);
      if (res.data.success) {
        setProduct(res.data.data);
      } else {
        toast.error(res.data.message || "Failed to fetch product details");
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  useEffect(() => {
    FetchProductDetails();
  }, [params]);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.image.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prevIndex) =>
        (prevIndex - 1 + product.image.length) % product.image.length
    );
  };

  // console.log("product at product display page", product);

  return (
    <div>
      <div className=" max-w-sm lg:max-w-7xl  mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
          {/* Image Carousel */}
          <div className="relative mx-auto md:max-w-2xl lg:max-w-4xl xl:max-w-5xl">
            <div className="bg-gray-200 rounded-lg overflow-hidden">
              {product.image.length > 0 ? (
                <img
                  src={product.image[currentImageIndex]}
                  alt={`${product.name} - Image ${currentImageIndex + 1}`}
                  className="w-full h-full object-contain"
                />
              ) : (
                <p className="text-gray-500 text-center py-16">
                  No images available
                </p>
              )}
            </div>
            {product.image.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>
              <p className="text-2xl font-semibold text-gray-900 mb-4">
                ₹{product.price}
              </p>
              <p className="text-gray-600 mb-6">{product.description}</p>
              {/* <p className="text-sm text-gray-500 mb-4">
                In stock: {product.stock}
              </p> */}
              {product.more_details && <p>More Details:</p>}
              {product.more_details &&
                Object.keys(product.more_details).map((key) => (
                  <p key={key} className="text-gray-600 mb-4">
                    {key}: {product.more_details[key]}
                  </p>
                ))}
            </div>
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
              {product.stock === 0 ? (
                <button
                  disabled
                  className="flex-1 bg-gray-300 text-gray-600 py-3 px-6 rounded-md cursor-not-allowed"
                >
                  Out of Stock
                </button>
              ) : (
                <button className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition duration-300 flex items-center justify-center">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDisplayPage;
