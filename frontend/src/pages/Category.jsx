import { useState } from "react";
import UploadcategoryModel from "../components/UploadcategoryModel";

const Category = () => {
  const [open, setopen] = useState(false);
  return (
    <section>
      <div className="p-2  text-2xl flex items-center justify-between">
        <h2 className="font-semibold">Category</h2>
        <button
          onClick={() => setopen(true)}
          className="text-sm border px-3 py-1 rounded"
        >
          Add
        </button>
      </div>
      {open && <UploadcategoryModel close={() => setopen(!open)} />}
    </section>
  );
};

export default Category;
