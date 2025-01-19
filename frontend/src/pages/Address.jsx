import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pencil, Trash2, Save, X, Plus } from "lucide-react";
import Axios from "../utils/Axios";
import { toast } from "react-toastify";
import { setAddress } from "../store/AddressSlice";

const Address = () => {
  const dispatch = useDispatch();
  const addresses = useSelector((state) => state.address.address);
  const [editingAddress, setEditingAddress] = useState(null);
  console.log("addressesaddresses", addresses);
  const [newAddress, setNewAddress] = useState({
    address_line: "",
    city: "",
    state: "",
    pincode: "",
    number: "",
  });

  const [isAdding, setIsAdding] = useState(false);

  // Handle changes for editing an address
  const handleEditChange = (field, value) => {
    setEditingAddress((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle changes for adding a new address
  const handleNewAddressChange = (field, value) => {
    setNewAddress((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Fetch addresses on component mount
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const res = await Axios.get("/api/address", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
          },
        });
        if (res.data.success) {
          dispatch(setAddress(res.data.data));
        }
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

    fetchAddresses();
  }, [dispatch]);

  // Add a new address
  const addAddress = async () => {
    try {
      const res = await Axios.post("/api/address/add", newAddress, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
        },
      });
      if (res.data.success) {
        dispatch(setAddress([...addresses, res.data.data]));
        setNewAddress({
          address_line: "",
          city: "",
          state: "",
          pincode: "",
          number: "",
        });
        setIsAdding(false);
        toast.success("Address added successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add address");
    }
  };

  // Save edited address
  const saveAddress = async () => {
    if (editingAddress) {
      try {
        const res = await Axios.put(
          `/api/address/${editingAddress._id}`,
          editingAddress,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
            },
          }
        );
        if (res.data.success) {
          dispatch(
            setAddress(
              addresses.map((a) =>
                a._id === editingAddress._id ? editingAddress : a
              )
            )
          );
          setEditingAddress(null);
          toast.success("Address updated successfully");
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to update address");
      }
    }
  };

  // Delete an address
  const deleteAddress = async (id) => {
    try {
      const res = await Axios.delete(`/api/address/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
        },
      });
      if (res.data.success) {
        dispatch(setAddress(addresses.filter((a) => a._id !== id)));
        toast.success("Address deleted successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete address");
    }
  };

  // Address form component
  const AddressForm = ({ data, onChange, onSave, onCancel }) => (
    <div className="space-y-4 bg-white p-6 rounded-lg shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Address Line
          </label>
          <input
            type="text"
            value={data.address_line}
            onChange={(e) => onChange("address_line", e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Address Line"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            City
          </label>
          <input
            type="text"
            value={data.city}
            onChange={(e) => onChange("city", e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="City"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            State
          </label>
          <input
            type="text"
            value={data.state}
            onChange={(e) => onChange("state", e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="State"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Pincode
          </label>
          <input
            type="text"
            value={data.pincode}
            onChange={(e) => onChange("pincode", e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Pincode"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="text"
            value={data.number}
            onChange={(e) => onChange("number", e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Number"
          />
        </div>
      </div>
      <div className="flex justify-end space-x-3 mt-4">
        <button
          onClick={onCancel}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          <X className="h-4 w-4 mr-2" />
          Cancel
        </button>
        <button
          onClick={onSave}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <Save className="h-4 w-4 mr-2" />
          Save
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            Manage Addresses
          </h1>
          {!isAdding && (
            <button
              onClick={() => setIsAdding(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Address
            </button>
          )}
        </div>

        {/* Add New Address */}
        {isAdding && (
          <div className="mb-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Add New Address
            </h2>
            <AddressForm
              data={newAddress}
              onChange={handleNewAddressChange}
              onSave={addAddress}
              onCancel={() => {
                setIsAdding(false);
                setNewAddress({
                  address_line: "",
                  city: "",
                  state: "",
                  pincode: "",
                  number: "",
                });
              }}
            />
          </div>
        )}

        {/* List of Addresses */}
        <div className="space-y-6">
          {addresses.map((address) => (
            <div
              key={address._id}
              className="bg-white shadow-sm rounded-lg overflow-hidden"
            >
              {editingAddress && editingAddress._id === address._id ? (
                <AddressForm
                  data={editingAddress}
                  onChange={handleEditChange}
                  onSave={saveAddress}
                  onCancel={() => setEditingAddress(null)}
                />
              ) : (
                <div className="p-6">
                  {/* Display Address */}
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <p className="text-lg font-medium text-gray-900">
                        {address.address_line}
                      </p>
                      <p className="text-sm text-gray-500">
                        {address.city}, {address.state} - {address.pincode}
                      </p>
                      <p className="text-sm text-gray-500">
                        Phone: {address.number}
                      </p>
                    </div>

                    {/* Edit/Delete Buttons */}
                    <div className="flex space-x-3">
                      <button
                        onClick={() => setEditingAddress(address)}
                        className="inline-flex items-center p-2 border border-gray-300 rounded-md shadow-sm text-gray-700 hover:bg-gray-50"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => deleteAddress(address._id)}
                        className="inline-flex items-center p-2 border border-gray-300 rounded-md shadow-sm text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Address;
