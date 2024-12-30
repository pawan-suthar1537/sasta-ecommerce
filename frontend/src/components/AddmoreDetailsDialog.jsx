import React from "react";
import { IoIosClose } from "react-icons/io";

const AddmoreDetailsDialog = ({ close, value, onChange, submit }) => {
  return (
    <section className="fixed top-0 left-0 bottom-0  right-0 bg-black/50 bg-opacity-80 z-50 flex items-center justify-center p-5  ">
      <div className="bg-white rounded p-4 w-full max-w-md">
        <div className="flex items-center justify-between">
          <h1>Add Field</h1>
          <button>
            <IoIosClose size={28} className="cursor-pointer" onClick={close} />
          </button>
        </div>
        <input
          className="border p-2 my-2 outline-none  rounded w-full"
          placeholder="enter field name"
          type="text"
          onChange={onChange}
          value={value}
        />
        <button
          onClick={submit}
          className="bg-primary px-4 py-2 rounded mx-auto w-fit  block "
        >
          Add Field
        </button>
      </div>
    </section>
  );
};

export default AddmoreDetailsDialog;
