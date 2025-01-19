import { useEffect, useState } from "react";
import { PlusIcon, PencilIcon, TrashIcon } from "lucide-react";
import { useGlobalCOntext } from "../provier/GlobalProvider";
import { useLocation } from "react-router-dom";
import Axios from "../utils/Axios";
import { toast } from "react-toastify";

const Checkout = () => {
  const location = useLocation();
  const { cart } = location.state || {}; // Access the cart from state

  useEffect(() => {
    if (!cart) {
      console.log("No cart data passed. Redirecting or handling...");
    }
  }, [cart]);

  const {
    Fetchcartitems,
    UpdateCartItemQTY,
    DeleteCart,
    totalprice,
    totalquantity,
    opencartmodel,
    setopencartmodel,
    handlelogout,
  } = useGlobalCOntext();

  const [addresses, setAddresses] = useState([]);
  const [editingAddress, setEditingAddress] = useState(null);
  const [newAddress, setNewAddress] = useState({
    address_line: "",
    city: "",
    state: "",
    pincode: "",
    number: "",
  });

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const res = await Axios.get("/api/address", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
          },
        });
        console.log("fetchAddresses", res.data.data);
        if (res.data.success) {
          console.log("Addresses fetched:", res.data.data);
          setAddresses(res?.data?.data);
        }
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

    fetchAddresses();
  }, []);

  const addAddress = async () => {
    if (addresses.length === 0) {
      try {
        const res = await Axios.post("/api/address/add", newAddress, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
          },
        });
        console.log("addAddress", res.data);
        if (res.data.success) {
          setAddresses([res.data.data]);
          setNewAddress({
            address_line: "",
            city: "",
            state: "",
            pincode: "",
            number: "",
          });
          toast.success("Address added successfully");
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to add address");
      }
    }
  };

  const editAddress = (address) => {
    setEditingAddress(address);
  };

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
          setAddresses(
            addresses.map((a) =>
              a._id === editingAddress._id ? editingAddress : a
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

  const deleteAddress = async (id) => {
    try {
      const res = await Axios.delete(`/api/address/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
        },
      });
      if (res.data.success) {
        setAddresses(addresses.filter((a) => a._id !== id));
        toast.success("Address deleted successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete address");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-2/3">
          <h2 className="text-2xl font-semibold mb-4">Addresses</h2>
          <div className="space-y-4">
            {addresses.map((address) => (
              <div key={address._id} className="bg-white p-4 rounded-lg shadow">
                {editingAddress && editingAddress._id === address._id ? (
                  //  changes in edit
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={editingAddress.address_line}
                      onChange={(e) =>
                        setEditingAddress({
                          ...editingAddress,
                          address_line: e.target.value,
                        })
                      }
                      className="w-full p-2 border rounded"
                      placeholder="Address Line"
                    />
                    <input
                      type="text"
                      value={editingAddress.city}
                      onChange={(e) =>
                        setEditingAddress({
                          ...editingAddress,
                          city: e.target.value,
                        })
                      }
                      className="w-full p-2 border rounded"
                      placeholder="City"
                    />
                    <input
                      type="text"
                      value={editingAddress.state}
                      onChange={(e) =>
                        setEditingAddress({
                          ...editingAddress,
                          state: e.target.value,
                        })
                      }
                      className="w-full p-2 border rounded"
                      placeholder="State"
                    />
                    <input
                      type="text"
                      value={editingAddress.pincode}
                      onChange={(e) =>
                        setEditingAddress({
                          ...editingAddress,
                          pincode: e.target.value,
                        })
                      }
                      className="w-full p-2 border rounded"
                      placeholder="Pincode"
                    />
                    <input
                      type="text"
                      value={editingAddress.number}
                      onChange={(e) =>
                        setEditingAddress({
                          ...editingAddress,
                          number: e.target.value,
                        })
                      }
                      className="w-full p-2 border rounded"
                      placeholder="Number"
                    />
                    <button
                      onClick={saveAddress}
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-between items-center">
                    <div>
                      <p>{address.address_line}</p>
                      <p>
                        {address.city}, {address.pincode}, {address.number}
                      </p>
                    </div>
                    <div className="space-x-2">
                      <button
                        onClick={() => editAddress(address)}
                        className="text-blue-500"
                      >
                        <PencilIcon className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => deleteAddress(address._id)}
                        className="text-red-500"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          {/* add address inputs */}
          {addresses.length === 0 && (
            <div className="mt-4 space-y-2">
              <input
                type="text"
                value={newAddress.address_line}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, address_line: e.target.value })
                }
                className="w-full p-2 border rounded"
                placeholder="Address Line"
              />
              <input
                type="text"
                value={newAddress.city}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, city: e.target.value })
                }
                className="w-full p-2 border rounded"
                placeholder="City"
              />
              <input
                type="text"
                value={newAddress.state}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, state: e.target.value })
                }
                className="w-full p-2 border rounded"
                placeholder="State"
              />
              <input
                type="text"
                value={newAddress.pincode}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, pincode: e.target.value })
                }
                className="w-full p-2 border rounded"
                placeholder="Pincode"
              />
              <input
                type="text"
                value={newAddress.number}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, number: e.target.value })
                }
                className="w-full p-2 border rounded"
                placeholder="Number"
              />
              <button
                onClick={addAddress}
                className="bg-green-500 text-white px-4 py-2 rounded flex items-center"
              >
                <PlusIcon className="w-5 h-5 mr-2" />
                Add Address
              </button>
            </div>
          )}
        </div>
        {/* cart data */}
        <div className="w-full lg:w-1/3">
          <h2 className="text-2xl font-semibold mb-4">Cart Details</h2>
          <div className="bg-white p-4 rounded-lg shadow">
            {cart.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between py-2 border-b"
              >
                <div className="flex items-center">
                  <img
                    src={item.productId.image[0] || "/placeholder.svg"}
                    alt={item.productId.name}
                    className="w-16 h-16 object-cover rounded mr-4"
                  />
                  <div>
                    <p className="font-semibold">{item.productId.name}</p>
                    <p className="text-sm text-gray-600">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                </div>
                <p className="font-semibold">
                  ₹{item.productId.price * item.quantity}
                </p>
              </div>
            ))}
            <div className="mt-4">
              <p className="text-xl font-bold">Total: ₹{totalprice}</p>
            </div>
          </div>
          <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg mt-4 font-semibold hover:bg-blue-700 transition-colors">
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
