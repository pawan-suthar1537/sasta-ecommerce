import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// Assuming toast is used for notifications
import Axios from "../utils/Axios";
import { toast } from "react-toastify";

const Resetpassord = () => {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (!location.state?.email) {
      navigate("/"); // Redirect if email is not provided in state
    } else {
      setData((prev) => ({ ...prev, email: location.state.email }));
    }
  }, []);
  const [data, setData] = useState({
    email: "",
    newpassword: "",
  });
  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Validate form inputs
  const validateForm = () => {
    const newErrors = {};
    if (!data.newpassword.trim()) {
      newErrors.newpassword = "New password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const res = await Axios({
          method: "put",
          url: "/api/user/resetpassword",
          data: {
            email: data.email,
            newpassword: data.newpassword,
          },
        });

        if (res.data.success) {
          toast.success(res.data.message);
          navigate("/login");
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        console.error("Reset password error:", error);
        toast.error(
          error.response?.data?.message ||
            "Something went wrong. Please try again."
        );
      }
    }
  };

  // Set email from location.state on component mount

  return (
    <div className="container flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full bg-slate-200 rounded-lg p-6">
        <h2 className="text-2xl text-center text-gray-800 mb-4">
          Reset Password
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Display email (read-only) */}
          {/* <div>
            <label htmlFor="email" className="block text-sm text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={data.email}
              disabled
              className="w-full px-4 py-2 border rounded-md bg-gray-100 cursor-not-allowed"
            />
          </div> */}

          {/* New password input */}
          <div>
            <label htmlFor="newpassword" className="block  text-gray-700 mb-1">
              Enter New Password
            </label>
            <input
              type="password"
              id="newpassword"
              name="newpassword"
              value={data.newpassword}
              onChange={handleChange}
              placeholder="Enter your new password"
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.newpassword
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:ring-blue-200"
              }`}
            />
            {errors.newpassword && (
              <p className="mt-1 text-sm text-red-500">{errors.newpassword}</p>
            )}
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={!data.newpassword}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default Resetpassord;
