import { IoClose } from "react-icons/io5";

const ViewFullimage = ({ url, close }) => {
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-5 ">
      <div className="w-full max-w-md max-h-[90vh] p-4 bg-white">
        <button onClick={close} className="w-fit ml-auto block">
          <IoClose size={24} />
        </button>
        <img
          src={url}
          alt="full image"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default ViewFullimage;
