import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaCircleUser } from "react-icons/fa6";
import Axios from "../utils/Axios";
import { toast } from "react-toastify";
import { setUserDetails, updateavatar } from "../store/UserSlice";
import FetchUsersDetails from "../utils/FetchUsersDetails";

const Profile = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setloading] = useState(false);
  const [avatarLoading, setavatarLoading] = useState(false);
  const [userdata, setuserdata] = useState({
    name: user.name,
    email: user.email,
    mobile: user.mobile,
  });

  const handlechange = (e) => {
    const { name, value } = e.target;
    setuserdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      return toast.error("Please select an image to upload.");
    }

    const formData = new FormData();
    formData.append("avatar", selectedFile);

    try {
      setavatarLoading(true);
      const response = await Axios({
        method: "PUT",
        url: "/api/user/avatar",
        data: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
        },
      });

      // console.log("response of avatar upload", response.data.data.avatar);

      const updatedUserAvatar = await response?.data?.data?.avatar;

      dispatch(updateavatar(updatedUserAvatar));

      toast.success("Profile image updated successfully.");
      setIsModalOpen(false);
      setSelectedFile(null);
    } catch (error) {
      setavatarLoading(false);
      console.error(error);
      toast.error("Error updating profile image.");
    } finally {
      setavatarLoading(false);
    }
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      setloading(true);
      const res = await Axios({
        method: "PUT",
        url: "/api/user/update",
        data: userdata,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
        },
      });
      // console.log("res of profile update", res.data);
      if (!res.data.success === true) {
        toast.error("Error updating profile");
      }

      const nyauserdata = await FetchUsersDetails();

      dispatch(setUserDetails(nyauserdata.data));

      toast.success("Profile updated successfully");
    } catch (error) {
      // console.log(error);
      toast.error("Error updating profile");
    } finally {
      setloading(false);
    }
  };

  return (
    <div>
      {user.avatar ? (
        <img
          src={user.avatar}
          alt="profile"
          className="w-20 h-20 rounded-full"
        />
      ) : (
        <FaCircleUser size={28} />
      )}
      <button
        className="text-sm px-3 py-1 rounded-full mt-5 border border-gray-300"
        onClick={() => setIsModalOpen(true)}
      >
        Change Profile
      </button>

      <form action="" className="my-4 grid gap-4" onSubmit={handlesubmit}>
        <div className="grid">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="enter name"
            value={userdata.name}
            className="p-2 bg-blue-50 outline-none border rounded"
            onChange={handlechange}
            required
          ></input>
        </div>
        <div className="grid">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={userdata.email}
            placeholder="enter email"
            className="p-2 bg-blue-50 outline-none border rounded"
            onChange={handlechange}
          ></input>
        </div>
        <div className="grid">
          <label htmlFor="mobile">Mobile</label>
          <input
            type="text"
            id="mobile"
            name="mobile"
            placeholder="enter mobile"
            value={userdata.mobile}
            required
            className="p-2 bg-blue-50 outline-none border rounded"
            onChange={handlechange}
          ></input>
        </div>
        <button
          disabled={loading}
          type="submit"
          className="border px-4 py-2 bg-primary"
        >
          {loading ? "loading..." : "update Details"}
        </button>
      </form>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Update Profile Image</h2>

            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mb-4"
            />

            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded-lg"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!selectedFile}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                onClick={handleSave}
              >
                {avatarLoading ? "loading..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
