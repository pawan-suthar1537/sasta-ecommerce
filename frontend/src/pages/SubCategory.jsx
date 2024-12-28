import { useEffect, useState } from "react";
import UploadSubcategorymodel from "../components/UploadSubcategorymodel";
import Axios from "../utils/Axios";
import { useDispatch, useSelector } from "react-redux";
import { setallsubcategory } from "../store/ProductSlice";
import DisplayTable from "../components/DisplayTable";
import { createColumnHelper } from "@tanstack/react-table";
import ViewFullimage from "../components/ViewFullimage";

const SubCategory = () => {
  const [openaddsubcategory, setopenaddsubcategory] = useState(false);

  const columnheloper = createColumnHelper();

  const [loading, setloading] = useState(false);
  const [getimageurl, setgetimageurl] = useState("");

  const dispatch = useDispatch();
  const allsubcategory = useSelector((state) => state.product.allsubcategory);

  const fetchallSubCategory = async () => {
    try {
      setloading(true);
      const res = await Axios({
        method: "GET",
        url: "/api/subcategory/getallsubcategory",
      });

      console.log("res of fetch all sub category", res.data.data);

      dispatch(setallsubcategory(res.data.data));
    } catch (error) {
      setloading(false);
      console.error(error);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    fetchallSubCategory();
  }, []);

  console.log("all subcategory data in state after fetch", allsubcategory);

  const columns = [
    columnheloper.accessor("name", {
      header: "Name",
    }),
    columnheloper.accessor("image", {
      header: "Image",
      cell: ({ row }) => {
        return (
          <div className="flex justify-center items-center">
            <img
              src={row.original.image}
              alt={row.original.name}
              className="w-12 h-12 cursor-pointer"
              onClick={() => {
                setgetimageurl(row.original.image);
              }}
            />
          </div>
        );
      },
    }),
    columnheloper.accessor("category", {
      header: "Category",
      cell: ({ row }) => {
        return (
          <>
            {row.original.category.map((cat, index) => {
              return (
                <p className="inline-block" key={index}>
                  {cat.name}
                  {index < row.original.category.length - 1 ? ", " : ""}
                </p>
              );
            })}
          </>
        );
      },
    }),
    columnheloper.accessor("_id", {
      header: "Action",
      cell: ({ row }) => {
        return (
          <div className="flex items-center justify-center gap-2">
            <button
              className="text-sm border px-3 py-1 rounded text-green-500 hover:text-green-700"
              onClick={() => {
                console.log("edit subcategory", row.original._id);
              }}
            >
              Edit
            </button>
            <button
              className="text-sm border px-3 py-1 rounded text-red-500 hover:text-red-700"
              onClick={() => {
                console.log("delete subcategory", row.original._id);
              }}
            >
              Delete
            </button>
          </div>
        );
      },
    }),
  ];
  return (
    <section className="relative z-[1]">
      <div className="p-2  text-2xl flex items-center justify-between">
        <h2 className="font-semibold">SubCategory</h2>
        <button
          onClick={() => setopenaddsubcategory(true)}
          className="text-sm border px-3 py-1 rounded"
        >
          Add SubCategory
        </button>
      </div>

      {/*  if loading show loading */}

      {loading && (
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
      )}

      {/*  render display table compoent */}

      <div>
        <DisplayTable data={allsubcategory} columns={columns} />
      </div>

      {/*  modal to add new subcategory */}
      {openaddsubcategory && (
        <UploadSubcategorymodel
          close={() => setopenaddsubcategory(false)}
          fetchallSubCategory={fetchallSubCategory}
        />
      )}

      {/*  show full image of subcategory */}
      {getimageurl && (
        <ViewFullimage url={getimageurl} close={() => setgetimageurl("")} />
      )}
    </section>
  );
};

export default SubCategory;
