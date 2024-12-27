import React, { useEffect, useState } from "react";
import UploadSubcategorymodel from "../components/UploadSubcategorymodel";
import Axios from "../utils/Axios";

const SubCategory = () => {
  const [openaddsubcategory, setopenaddsubcategory] = useState(false);
  const [openupdate, setopenupdate] = useState(false);
  const [subcategoryData, setsubcategoryData] = useState([]);
  const [loading, setloading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchallSubCategory = async () => {
    try {
      setloading(true);
      const res = await Axios({
        method: "GET",
        url: "/api/category/allcategory",
      });
      console.log("res of fetch all category", res.data.data);
      setsubcategoryData(res.data.data || []);
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
      {openaddsubcategory && (
        <UploadSubcategorymodel
          close={() => setopenaddsubcategory(false)}
          fetchallSubCategory={fetchallSubCategory}
        />
      )}
    </section>
  );
};

export default SubCategory;
