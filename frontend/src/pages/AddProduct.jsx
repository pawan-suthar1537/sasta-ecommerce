import { useState } from "react";
import {
  MdOutlineDriveFolderUpload,
  MdRemoveCircleOutline,
} from "react-icons/md";
import { useSelector } from "react-redux";
import { IoIosClose } from "react-icons/io";
import AddmoreDetailsDialog from "../components/AddmoreDetailsDialog";
import { toast } from "react-toastify";
import Axios from "../utils/Axios";

const AddProduct = () => {
  const [data, setdata] = useState({
    name: "",
    image: [],
    category: [],
    subcategory: [],
    unit: "",
    stock: "",
    price: "",
    discount: "",
    description: "",
    more_details: {},
    // published: true,
  });
  const [selected_category, setselected_category] = useState("");
  const [selected_Subcategory, setselected_Subcategory] = useState("");

  const [openmoredetail, setopenmoredetail] = useState(false);
  const [fieldname, setfieldname] = useState("");
  const [loading, setloading] = useState(false);

  const allcategory = useSelector((state) => state.product.allcategory);
  const allsubcategory = useSelector((state) => state.product.allsubcategory);

  const handlechange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setdata((prev) => ({
        ...prev,
        [name]: Array.from(files), // Convert FileList to an array
      }));
    } else {
      setdata((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const removeImage = (index) => {
    setdata((prev) => ({
      ...prev,
      image: prev.image.filter((_, i) => i !== index),
    }));
  };

  const generateImagePreviews = () => {
    return data.image.map((file) => {
      return URL.createObjectURL(file);
    });
  };

  const handleaddmoredetails = (e) => {
    setdata((prev) => ({
      ...prev,
      more_details: {
        ...prev.more_details,
        [fieldname]: e.target.value,
      },
    }));
    setfieldname("");
    setopenmoredetail(false);
  };

  const handleaddproduct = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("unit", data.unit);
    formData.append("stock", data.stock);
    formData.append("discount", data.discount);
    formData.append("description", data.description);

    data.category.forEach((categoryItem) => {
      formData.append("category", categoryItem._id);
    });
    if (Array.isArray(data.subcategory)) {
      data.subcategory.forEach((subcategoryItem) => {
        formData.append("subcategory", subcategoryItem._id);
      });
    } else {
      formData.append("subcategory", data.subcategory._id);
    }

    data.image.forEach((imageFile) => {
      formData.append("image", imageFile);
    });

    formData.append(
      "more_details",
      typeof data.more_details === "string"
        ? data.more_details
        : JSON.stringify(data.more_details)
    );

    for (let pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    try {
      setloading(true);

      const res = await Axios({
        method: "POST",
        url: "/api/product/add",
        data: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Response from add product:", res.data);

      if (!res.data.success) {
        toast.error(res.data.message || "Failed to add product");
        setloading(false);
        return;
      }

      toast.success("Product added successfully!");

      setdata({
        name: "",
        image: [],
        category: [],
        subcategory: [],
        unit: "",
        stock: "",
        price: "",
        discount: "",
        description: "",
        more_details: {},
        // published: true,
      });
    } catch (error) {
      console.error("Error in adding product:", error);
      toast.error(error.response.data.message || "Failed to add product");
    } finally {
      setloading(false);
      setdata({
        name: "",
        image: [],
        category: [],
        subcategory: [],
        unit: "",
        stock: "",
        price: "",
        discount: "",
        description: "",
        more_details: {},
        // published: true,
      });
    }
  };

  return (
    <section>
      <div className="p-2  text-2xl flex items-center justify-between">
        <h2 className="font-semibold">Add Product</h2>
      </div>
      {/* form */}
      <div className="grid  p-3">
        <form className="grid gap-4" onSubmit={handleaddproduct}>
          <div className="grid grid-cols-5 gap-4">
            <div className="grid gap-1">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="name"
                value={data.name}
                onChange={handlechange}
                required
                className="border p-2 rounded outline-none"
              />
            </div>
            <div className="grid gap-1">
              <label htmlFor="unit">Unit</label>
              <input
                type="text"
                name="unit"
                id="unit"
                placeholder="unit"
                value={data.unit}
                onChange={handlechange}
                className="border p-2 rounded outline-none"
              />
            </div>
            <div className="grid gap-1">
              <label htmlFor="stock">Stock</label>
              <input
                type="number"
                name="stock"
                id="stock"
                placeholder="stock"
                value={data.stock}
                onChange={handlechange}
                required
                className="border p-2 rounded outline-none"
              />
            </div>

            <div className="grid gap-1">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                name="price"
                id="price"
                placeholder="price"
                value={data.price}
                onChange={handlechange}
                required
                className="border p-2 rounded outline-none"
              />
            </div>
            <div className="grid gap-1">
              <label htmlFor="discount">Discount</label>
              <input
                type="number"
                name="discount"
                id="discount"
                placeholder="discount"
                value={data.discount}
                onChange={handlechange}
                required
                className="border p-2 rounded outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="grid gap-1">
              <label htmlFor="description">Description</label>
              <textarea
                type="text"
                name="description"
                id="description"
                placeholder="description"
                value={data.description}
                onChange={handlechange}
                required
                multiple
                rows={3}
                className="border p-2 rounded outline-none resize-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-1">
              <label htmlFor="category">Category</label>
              <div className="">
                <select
                  value={selected_category}
                  className="border w-full p-2 rounded outline-none"
                  onChange={(e) => {
                    const value = e.target.value;
                    const cat = allcategory.find((item) => item._id === value);
                    if (cat) {
                      setdata((prev) => {
                        const existingCategoryIndex = prev.category.findIndex(
                          (item) => item._id === cat._id
                        );

                        if (existingCategoryIndex === -1) {
                          return {
                            ...prev,
                            category: [...prev.category, cat],
                          };
                        } else {
                          return {
                            ...prev,
                            category: prev.category.map((item, index) =>
                              index === existingCategoryIndex ? cat : item
                            ),
                          };
                        }
                      });
                    }
                    setselected_category("");
                  }}
                >
                  <option value="">Select Category</option>
                  {allcategory.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  ))}
                </select>
                <div className="flex flex-wrap gap-3">
                  {data.category.map((item, index) => (
                    <div
                      key={item._id + index}
                      className="text-lg flex items-center gap-1 mt-2 p-1 bg-blue-100 rounded-lg"
                    >
                      <span>{item.name}</span>
                      <div
                        onClick={() => {
                          setdata((prev) => ({
                            ...prev,
                            category: prev.category.filter(
                              (_, i) => i !== index
                            ),
                          }));
                        }}
                      >
                        <IoIosClose size={28} className="cursor-pointer" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-1">
              <label htmlFor="subcategory">Sub Category</label>
              <div className="">
                <select
                  value={selected_Subcategory}
                  className="border w-full p-2 rounded outline-none"
                  onChange={(e) => {
                    const value = e.target.value;
                    const subcat = allsubcategory.find(
                      (item) => item._id === value
                    );
                    if (subcat) {
                      setdata((prev) => {
                        const existingSubcategoryIndex =
                          prev.subcategory.findIndex(
                            (item) => item._id === subcat._id
                          );

                        if (existingSubcategoryIndex === -1) {
                          return {
                            ...prev,
                            subcategory: [...prev.subcategory, subcat],
                          };
                        } else {
                          return {
                            ...prev,
                            subcategory: prev.subcategory.map((item, index) =>
                              index === existingSubcategoryIndex ? subcat : item
                            ),
                          };
                        }
                      });
                    }
                    setselected_Subcategory("");
                  }}
                >
                  <option value="">Select Subcategory</option>
                  {allsubcategory.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  ))}
                </select>
                <div className="flex flex-wrap gap-3">
                  {data.subcategory.map((item, index) => (
                    <div
                      key={item._id + index}
                      className="text-lg flex items-center gap-1 mt-2 p-1 bg-blue-100 rounded-lg"
                    >
                      <span>{item.name}</span>
                      <div
                        onClick={() => {
                          setdata((prev) => ({
                            ...prev,
                            subcategory: prev.subcategory.filter(
                              (_, i) => i !== index
                            ),
                          }));
                        }}
                      >
                        <IoIosClose size={28} className="cursor-pointer" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="grid gap-1">
            <label htmlFor="image">Image</label>
            <div className="flex items-center justify-center border p-2 rounded outline-none">
              <label
                htmlFor="image"
                className="cursor-pointer flex flex-col items-center"
              >
                <MdOutlineDriveFolderUpload
                  size={30}
                  className="text-gray-500"
                />
                <span className="text-sm text-gray-500">Upload Image</span>
              </label>
              <input
                type="file"
                name="image"
                id="image"
                onChange={handlechange}
                multiple
                className="hidden"
              />
            </div>
          </div>
          {data.image.length > 0 && (
            <div className="mt-2">
              <ul className="grid grid-cols-5 gap-4">
                {generateImagePreviews().map((imageUrl, index) => (
                  <li
                    key={index}
                    className="relative flex justify-center items-center"
                  >
                    <img
                      src={imageUrl}
                      alt={`Preview ${index}`}
                      className="w-16 h-16 object-cover rounded"
                    />
                    {/* Remove Button */}
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute bottom-0 right-0 text-red-500 hover:text-red-700"
                      style={{ transform: "translate(25%, 25%)" }} // Adjust to bottom-right corner
                    >
                      <MdRemoveCircleOutline size={20} />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/*  show more details */}

          <div className="grid gap-4">
            {Object.keys(data.more_details).map((key, index) => {
              const gridStartIndex = Math.floor(index / 4) * 4;
              const isNewRow = index % 4 === 0;
              const currentRowItems = Object.keys(data.more_details).slice(
                gridStartIndex,
                gridStartIndex + 4
              );

              if (isNewRow) {
                return (
                  <div key={gridStartIndex} className="grid grid-cols-4 gap-4">
                    {currentRowItems.map((key, colIndex) => (
                      <div key={key + colIndex} className="flex flex-col gap-1">
                        <label htmlFor={key}>{key}</label>
                        <input
                          type="text"
                          name={key}
                          id={key}
                          value={data.more_details[key]}
                          onChange={(e) => {
                            setdata((prev) => ({
                              ...prev,
                              more_details: {
                                ...prev.more_details,
                                [key]: e.target.value,
                              },
                            }));
                          }}
                          className="border p-2 rounded outline-none"
                        />
                      </div>
                    ))}
                  </div>
                );
              }

              return null; // Avoid rendering individual items outside the grid
            })}
          </div>

          <div
            onClick={() => setopenmoredetail(true)}
            className="inline-block py-1 px-3 bg-primary w-36 cursor-pointer  border-black text-white hover:text-black rounded-md"
          >
            More Details?{" "}
          </div>
          <button
            type="submit"
            className="inline-block py-2 bg-blue-500 text-white hover:text-black rounded-md"
          >
            {loading ? "Loading..." : "Add Product"}
          </button>
        </form>
      </div>
      {openmoredetail && (
        <AddmoreDetailsDialog
          close={() => setopenmoredetail(false)}
          value={fieldname}
          onChange={(e) => setfieldname(e.target.value)}
          submit={handleaddmoredetails}
        />
      )}
    </section>
  );
};

export default AddProduct;
