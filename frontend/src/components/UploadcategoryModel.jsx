import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import Axios from "../utils/Axios";
import { toast } from "react-toastify";

// eslint-disable-next-line react/prop-types
const UploadcategoryModel = ({ close, handleCategoryAdded }) => {
  const [categoryData, setCategoryData] = useState({
    name: "",
    image: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // To store error messages

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    // console.log(" category image file", file);
    if (file) {
      setCategoryData((prev) => ({ ...prev, image: file }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      const formData = new FormData();
      formData.append("name", categoryData.name);
      formData.append("image", categoryData.image);

      // console.log("form data category", formData);

      const response = await Axios({
        method: "POST",
        url: "/api/category/add_category",
        data: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
        },
      });

      // console.log("response of category create", response.data);

      if (!response.data.success === true) {
        throw new Error("Failed to create category");
      }
      toast.success(`Category ${categoryData.name} created successfully`);
      handleCategoryAdded();
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-30 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Add New Category</h3>
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
              Category Name
            </label>
            <input
              type="text"
              value={categoryData.name}
              onChange={(e) =>
                setCategoryData((prev) => ({ ...prev, name: e.target.value }))
              }
              className="w-full border rounded p-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Category Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border rounded p-2"
              required
            />
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
              disabled={!categoryData.name || isLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-400"
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadcategoryModel;
