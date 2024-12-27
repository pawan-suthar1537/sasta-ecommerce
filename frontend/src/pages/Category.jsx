import { useEffect, useState } from "react";
import UploadcategoryModel from "../components/UploadcategoryModel";
import nodata from "../assets/nodata.jpg";
import Axios from "../utils/Axios";
import { VscEdit } from "react-icons/vsc";
import UpdateCategorymodel from "../components/UpdateCategorymodel";
import { MdDeleteOutline } from "react-icons/md";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setallcategory } from "../store/ProductSlice";

const Category = () => {
  const [open, setopen] = useState(false);
  const [openupdate, setopenupdate] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setloading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const dispatch = useDispatch();

  const allcategory = useSelector((state) => state.product.allcategory);

  const fetchallCategory = async () => {
    try {
      const res = await Axios({
        method: "GET",
        url: "/api/category/allcategory",
      });
      console.log("res of fetch all category", res.data.data);
      // setCategoryData(res.data.data || []);
      dispatch(setallcategory(res.data.data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setCategoryData(allcategory);
  }, [allcategory]);

  const handleCategoryAdded = () => {
    fetchallCategory();
    setopen();
  };
  const handleCategoryUpdated = () => {
    fetchallCategory();
    setopenupdate(false);
  };

  const handleEditClick = (category) => {
    setSelectedCategory(category);
    setopenupdate(true);
  };
  const handleDeleteClick = async (category) => {
    console.log("selected delete category", category);
    try {
      const res = await Axios({
        method: "DELETE",
        url: `/api/category/delete_category/`,
        data: { categoryId: category._id },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
        },
      });
      console.log("response of category delete", res.data);
      if (!res.data.success === true) {
        toast.error("Failed to delete category");
      }
      toast.success(`Category deleted successfully`);

      fetchallCategory();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete category");
    }
  };

  return (
    <section className=" z-[1]">
      <div className="p-2  text-2xl flex items-center justify-between">
        <h2 className="font-semibold">Category</h2>
        <button
          onClick={() => setopen(true)}
          className="text-sm border px-3 py-1 rounded"
        >
          Add
        </button>
      </div>

      {open && (
        <UploadcategoryModel
          close={() => setopen(!open)}
          handleCategoryAdded={handleCategoryAdded}
        />
      )}

      {openupdate && selectedCategory && (
        <UpdateCategorymodel
          close={() => setopenupdate(false)}
          category={selectedCategory}
          handleCategoryUpdated={handleCategoryUpdated}
        />
      )}

      {loading ? (
        <div role="status" className="flex items-center justify-center p-8">
          <svg
            aria-hidden="true"
            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span class="sr-only">Loading...</span>
        </div>
      ) : categoryData.length === 0 ? (
        <div className="flex items-center justify-center h-full lg:h-[400px] w-full">
          <img
            src={nodata}
            alt="nodata"
            className="lg:w-[25rem] lg:h-[25rem] w-[15rem] h-[15rem]"
          />
        </div>
      ) : (
        <div className=" grid grid-cols-2 md:grid-cols-3  lg:grid-cols-5  justify-center  ">
          {categoryData &&
            categoryData.map((category, i) => (
              <div
                key={i}
                className="justify-center items-center flex flex-col p-2 relative"
              >
                <img
                  src={category.image}
                  alt="category image "
                  className="w-32 h-32 object-cover rounded-md  "
                />
                <div className="flex flex-col items-center justify-center">
                  <button
                    onClick={() => handleEditClick(category)}
                    className="absolute top-0 right-14 cursor-pointer bg-green-400 p-1 rounded-full"
                  >
                    <VscEdit size={18} />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(category)}
                    className="absolute top-0 right-5 cursor-pointer bg-red-400 p-1  rounded-full"
                  >
                    <MdDeleteOutline size={18} />
                  </button>
                </div>
                <h2 className="">{category.name}</h2>
              </div>
            ))}
        </div>
      )}
    </section>
  );
};

export default Category;
