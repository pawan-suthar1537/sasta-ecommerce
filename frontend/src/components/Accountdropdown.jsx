import { useState, useRef, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { CiSettings, CiUser } from "react-icons/ci";
import { Link } from "react-router-dom";
/* eslint-disable react/prop-types */

export function AccountDropdown({ user, onLogout, ismobile }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setIsOpen(false);
    onLogout();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 hover:text-gray-600 transition-colors"
      >
        {ismobile ? <CiUser size={28} /> : <p>Account</p>}

        {!ismobile && (
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${
              isOpen ? "transform rotate-180" : ""
            }`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="text-sm text-gray-500 truncate">
              {user?.email || user?.mobile}
            </p>
          </div>

          <Link to="/dashboard/profile">
            <button
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              <FaUser className="w-4 h-4" />
              Profile
            </button>
          </Link>

          <Link to="/dashboard/myorder">
            <button
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              <CiSettings className="w-4 h-4" />
              My Orders
            </button>
          </Link>
          <Link to="/dashboard/address">
            <button
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              <CiSettings className="w-4 h-4" />
              My Address
            </button>
          </Link>

          <div className="border-t border-gray-100">
            <button
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center gap-2"
              onClick={handleLogout}
            >
              <IoLogOutOutline className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
