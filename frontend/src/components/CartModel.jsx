import { FaMinus, FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useGlobalCOntext } from "../provier/GlobalProvider";
import { useEffect, useRef } from "react";

const CartModel = ({ close }) => {
  const { UpdateCartItemQTY, DeleteCart, totalprice } = useGlobalCOntext();
  const cart = useSelector((state) => state.cart.cart);
  const modalRef = useRef(null);

  const handleQuantityChange = (id, quantity) => {
    if (quantity <= 0) {
      DeleteCart(id);
    } else {
      UpdateCartItemQTY(id, quantity);
    }
  };
  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      close();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex justify-end">
      <div
        ref={modalRef}
        className="w-[400px] bg-white h-full shadow-lg flex flex-col"
      >
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-xl font-semibold">Your Cart</h2>
          <button onClick={close} className="p-1">
            Close
          </button>
        </div>
        <div className="flex-1 overflow-auto px-4">
          {cart.length === 0 ? (
            <div className="h-full flex items-center justify-center text-gray-500">
              Your cart is empty
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item?._id}
                className="flex gap-4 p-3 bg-gray-50 rounded-lg"
              >
                <img
                  src={item?.productId?.image?.[0]}
                  alt={item?.productId?.name}
                  className="w-24 h-24 object-cover"
                />
                <div className="flex-1">
                  <h3 className="line-clamp-2">{item?.productId?.name}</h3>
                  <p>₹{item?.productId?.price} per item</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() =>
                        handleQuantityChange(item._id, item.quantity - 1)
                      }
                      className="p-1"
                    >
                      <FaMinus />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() =>
                        handleQuantityChange(item._id, item.quantity + 1)
                      }
                      className="p-1"
                    >
                      <FaPlus />
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => DeleteCart(item._id)}
                  className="text-red-500 text-sm"
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>
        <div className="border-t p-4">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{totalprice}</span>
          </div>
          <button className="w-full bg-black text-white py-2 mt-2">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartModel;
