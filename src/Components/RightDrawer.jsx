import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import cart from "../assets/cart.png";
import SelectedCategoryContext from "../Contexts/SelectedCategoryContext";

function RightDrawer() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { cartItems, setCartItems } = useContext(SelectedCategoryContext);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const incrementQuantity = (title) => {
    setCartItems(
      cartItems.map((item) =>
        item.title === title ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementQuantity = (title) => {
    setCartItems(
      cartItems.map((item) =>
        item.title === title && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (title) => {
    setCartItems(cartItems.filter((item) => item.title !== title));
  };

  const getTotalAmount = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  useEffect(() => {
    const handleBodyScroll = () => {
      if (isDrawerOpen && window.innerWidth < 768) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    };

    handleBodyScroll(); // Initial check
    window.addEventListener("resize", handleBodyScroll);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("resize", handleBodyScroll);
    };
  }, [isDrawerOpen]);

  return (
    <>
      <div className="m-center">
        <Link
          className=""
          onClick={toggleDrawer}
          aria-controls="drawer-right-example"
          aria-expanded={isDrawerOpen}
        >
          <img className="h-8" src={cart} alt="Cart" />
        </Link>
      </div>

      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleDrawer}
        ></div>
      )}

      <div
        id="drawer-right-example"
        className={`fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        } bg-white md:w-10/12 lg:w-2/6 w-full dark:bg-gray-800`}
        tabIndex="-1"
        aria-labelledby="drawer-right-label"
      >
        <h5
          id="drawer-right-label"
          className="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400"
        >
          <svg
            className="w-4 h-4 me-2.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          Your Cart
        </h5>
        <button
          type="button"
          onClick={toggleDrawer}
          aria-controls="drawer-right-example"
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span className="sr-only">Close menu</span>
        </button>

        <div className="mb-6 text-sm text-gray-500 dark:text-gray-400">
          <div
            className="flex flex-col justify-end items-between bg-blue-100 py-12 px-6 rounded-xl flex-wrap mb-4
          lg:flex-row lg:justify-between lg:items-end"
          >
            <span className="flex flex-col my-4">
              Total Amount:
              <span className="text-5xl">${getTotalAmount().toFixed(2)}</span>
            </span>
            <button
              className={`text-white bg-blue-700 my-4 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-52 lg:w-auto ${
                cartItems.length === 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() => {
                if (cartItems.length > 0) {
                  alert("Proceeding to checkout");
                  // Add your checkout logic here
                }
              }}
              disabled={cartItems.length === 0}
            >
              Proceed to Checkout
            </button>
          </div>

          {cartItems.length === 0 ? (
            <div className="text-3xl mt-16 py-8 px-4 bg-red-100 text-gray-500 dark:text-gray-400">
              Your cart is empty
            </div>
          ) : (
            <div className="grid gap-4">
              {cartItems.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-600"
                >
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-16 h-16 object-cover mr-4"
                  />
                  <div className="flex-1">
                    <h5 className="font-medium text-gray-900 dark:text-white">
                      {item.title}
                    </h5>
                    <div className="flex items-center mt-2">
                      <button
                        className="px-2 py-1 bg-gray-200 rounded dark:bg-gray-700"
                        onClick={() => decrementQuantity(item.title)}
                      >
                        -
                      </button>
                      <span className="px-4">{item.quantity}</span>
                      <button
                        className="px-2 py-1 bg-gray-200 rounded dark:bg-gray-700"
                        onClick={() => incrementQuantity(item.title)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="font-medium text-gray-900 dark:text-white">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                    <button
                      className="text-red-500 hover:text-red-700 mt-2"
                      onClick={() => removeItem(item.title)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default RightDrawer;
