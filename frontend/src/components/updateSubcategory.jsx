import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import Axios from "../utils/Axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RxCross1 } from "react-icons/rx";

// eslint-disable-next-line react/prop-types
const UpdateSubcategory = ({ close, data, fetchallSubCategory }) => {
  const allcategory = useSelector((state) => state.product.allcategory);

  const [subcategoryData, setsubcategoryData] = useState({
    _id: data?._id,
    name: data?.name,
    image: data?.image,
    category: data?.category || [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    // console.log("sub category update image file", file);
    if (file) {
      setsubcategoryData((prev) => ({ ...prev, image: file }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      const categoryIds = subcategoryData.category.map((cat) => cat._id);
      const formData = new FormData();
      formData.append("name", subcategoryData.name);
      formData.append("image", subcategoryData.image);
      formData.append("_id", subcategoryData._id);
      formData.append("category", JSON.stringify(categoryIds));

      const response = await Axios({
        method: "PUT",
        url: "api/subcategory/updatesubcategory",
        data: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      // console.log("response of edit sub category create", response.data);

      if (!response.data.success === true) {
        throw new Error("Failed to edit sub category");
      }
      toast.success(`Sub Category ${subcategoryData.name} edited successfully`);
      await fetchallSubCategory();
      close();
    } catch (error) {
      console.error("Error creating category:", error);
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleremoveselectedcategory = (categoryId) => {
    setsubcategoryData((prev) => {
      const updatedCategories = prev.category.filter(
        (c) => c._id !== categoryId
      );
      return {
        ...prev,
        category: updatedCategories,
      };
    });
  };

  return (
    <section className="fixed inset-0 bg-black bg-opacity-50 z-30 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            Update Sub Category {subcategoryData.name}
          </h3>
          <button
            onClick={() => close()}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <RxCross2 className="h-5 w-5" />
          </button>
        </div>
        {errorMessage && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Sub Category Name
            </label>
            <input
              type="text"
              value={subcategoryData.name}
              onChange={(e) =>
                setsubcategoryData((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
              className="w-full border rounded p-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Sub Category Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border rounded p-2"
            />
          </div>

          {/* select sub category */}
          <div className="grid gap-2">
            <div className="flex flex-wrap gap-2">
              {subcategoryData.category.map((c, i) => {
                return (
                  <p
                    className="bg-white px-1 m-1 flex items-center gap-2"
                    key={i}
                  >
                    {c.name}
                    <div
                      className="cursor-pointer"
                      onClick={() => handleremoveselectedcategory(c._id)}
                    >
                      <RxCross1 size={15} />
                    </div>
                  </p>
                );
              })}
            </div>

            <select
              className="w-full border  p-2"
              onChange={(e) => {
                const value = e.target.value;
                const categoryDetails = allcategory.find(
                  (el) => el._id == value
                );
                if (categoryDetails) {
                  setsubcategoryData((prev) => {
                    return {
                      ...prev,
                      category: [...prev.category, categoryDetails],
                    };
                  });
                }
              }}
            >
              <option value="" disabled>
                Update new category
              </option>
              {allcategory?.map((cat, index) => {
                return (
                  <option key={index} value={cat?._id}>
                    {cat?.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="button"
              onClick={close}
              className="px-4 py-2 border rounded hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={
                !subcategoryData.name || subcategoryData.category.length === 0
              }
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-400"
            >
              {isLoading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UpdateSubcategory;
