import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Axios from "../utils/Axios";
import { toast } from "react-toastify";
import CardProduct from "../components/CardProduct";
import { useSelector } from "react-redux";
import ValidUrlConvert from "../utils/URLconverter";

const ProductListPage = () => {
  const [data, setdata] = useState([]);
  const [page, setpage] = useState(1);
  const [loading, setloading] = useState(false);
  const [totalpage, settotalpage] = useState(1);
  const params = useParams();
  const [displaysubcategory, setdisplaysubcategory] = useState([]);

  const allsubcategoryfromstate = useSelector(
    (state) => state.product.allsubcategory
  );

  let subcategory = params?.subcat?.split("-");
  let subcategoryname = subcategory
    ?.slice(0, subcategory?.length - 1)
    ?.join(" ");

  const categoryId = params.cat.split("-").slice(-1)[0];
  const subcategoryId = params.subcat.split("-").slice(-1)[0];

  const FetchProductDatabycidsid = async () => {
    try {
      setloading(true);
      const res = await Axios({
        method: "POST",
        url: `/api/product/getbycidsid`,
        data: {
          page: page,
          limit: 8,
          categoryId: categoryId,
          subcategoryId: subcategoryId,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("res getbycidsid", res.data);
      if (!res.data.success === true) {
        toast.error(res.data.message || "Failed to fetch product by category");
        return;
      }
      if (res.data.success === true) {
        if ((res, data.page == 1)) {
          setdata(res.data.data);
        } else {
          setdata([...res.data.data, ...res.data.data]);
        }
        settotalpage(res.data.page);
      }
      setloading(false);
    } catch (error) {
      console.error(error);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    FetchProductDatabycidsid();
  }, [params]);
  useEffect(() => {
    const sub = allsubcategoryfromstate.filter((sub) => {
      const filterdata = sub.category.some((el) => {
        return el._id === categoryId;
      });
      return filterdata ? filterdata : null;
    });
    setdisplaysubcategory(sub);
    console.log("sub", sub);
  }, [params, allsubcategoryfromstate]);

  return (
    <section className="sticky top-24   lg:top-20">
      <div className="container sticky top-24   max-w-7xl mx-auto grid grid-cols-[120px,1fr] md:grid-cols-[200px,1fr] lg:grid-cols-[290px,1fr] ">
        {/* first part all subcategory */}
        <div className=" min-h-[80vh] max-h-[79vh] overflow-y-scroll lg:py-4 p-2 grid gap-4 scrollbarcustom">
          {displaysubcategory.map((s, index) => {
            const url = `/${ValidUrlConvert(s?.category[0]?.name)}-${
              s?.category[0]._id
            }/${ValidUrlConvert(s.name)}-${s._id}`;
            return (
              <Link
                to={url}
                className={`w-full p-2 lg:flex items-center hover:bg-green-100 cursor-pointer ${
                  subcategoryId === s._id ? "bg-green-200" : ""
                }`}
                key={index}
              >
                <div className="w-fit mx-auto">
                  <img
                    src={s.image}
                    alt="asd"
                    className=" h-full w-14 object-scale-down "
                  />
                  <div className="text-start">
                    <h3>{s.name}</h3>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        {/* all product of that subcategory */}
        <div className="sticky top-20 ">
          <div className="bg-white p-3">
            <h3>{subcategoryname}</h3>
          </div>

          {/* display products */}
          <div className="min-h-[70vh] max-h-[70vh]  overflow-y-scroll scrollbarcustom relative">
            <div className="grid grid-cols-1 p-4  md:grid-cols-3 lg:grid-cols-4 justify-center items-center  gap-3">
              {data.map((product, i) => (
                <CardProduct data={product} key={i} />
              ))}
            </div>
          </div>

          {/* loading */}

          {loading && (
            <div
              role="status"
              className="flex items-center justify-center  p-8"
            >
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
        </div>
      </div>
    </section>
  );
};

export default ProductListPage;
