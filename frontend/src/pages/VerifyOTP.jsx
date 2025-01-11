import { useEffect, useState } from "react";

import { toast } from "react-toastify";
import Axios from "../utils/Axios";
import { useLocation, useNavigate } from "react-router-dom";

const VerifyOTP = () => {
  const [formData, setFormData] = useState({
    otp: "",
  });

  const location = useLocation();
  const email = location.state?.email;
  // console.log("email from state:", email);

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    if (!email) {
      navigate("/forgotpassword");
    }
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.otp.trim()) {
      newErrors.otp = "OTP is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    formData.email = location.state.email;

    if (validateForm()) {
      try {
        const res = await Axios({
          url: "/api/user/verifyforgotpassword",
          data: formData,
          method: "put",
        });

        if (res.data.success) {
          toast.success(res.data.message);
          navigate("/password-reset", {
            state: {
              data: res?.data,
              email: location.state?.email,
            },
          });
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        console.error("verify otp error:", error.message);
        toast.error(
          error.response?.data?.message ||
            "Something went wrong. Please try again."
        );
      }
    }
  };

  return (
    <div className="container flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full bg-slate-200 rounded-lg p-6">
        <h2 className="text-2xl text-center text-gray-800 mb-4">Verify OTP</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="text" className="block text-sm text-gray-700 mb-1">
              OTP
            </label>
            <input
              type="text"
              id="text"
              name="otp"
              value={formData.otp}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.email
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:ring-blue-200"
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.otp}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!formData.otp}
          >
            send otp
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOTP;
