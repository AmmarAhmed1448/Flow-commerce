import { Link } from "react-router-dom";
import starIcon from "../assets/star.png";
import { useContext } from "react";
import { useMediaQuery } from "react-responsive";
import SelectedCategoryContext from "../Contexts/SelectedCategoryContext";

function Card({
  title,
  description,
  price,
  discount,
  rating,
  stock,
  thumbnail,
}) {
  const isLargeScreen = useMediaQuery({ query: "(min-width: 1024px)" });

  const { cartItems, setCartItems } = useContext(SelectedCategoryContext);

  const truncateText = (text, length) => {
    return text.length <= length ? text : text.substring(0, length) + "...";
  };

  function addToCart() {
    const itemIndex = cartItems.findIndex(item => item.title === title);
    if (itemIndex >= 0) {
      const updatedCartItems = cartItems.map((item, index) =>
        index === itemIndex ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { title, price, quantity: 1, thumbnail }]);
    }
  }

  return (
    <div
      className="col-span-6 md:col-span-3 xl:col-span-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
    >
      <Link to="/">
        <img
          className="pb-2 rounded-t-lg object-contain h-32 mx-auto"
          src={thumbnail}
          alt="product image"
        />
      </Link>
      <div className="px-2 pb-5">
        <Link to="/">
          <h5 className="text-sm pb-2 font-semibold text-gray-900 dark:text-white">
            {truncateText(title, 20)}
          </h5>
          <p className="text-sm text-gray-900 dark:text-white py-md:text-normal">
            {truncateText(description,40 )}
          </p>
        </Link>
        <div className="flex items-center mt-2 mb-2">
          <div className="flex items-center space-x-1 rtl:space-x-reverse">
            <img src={starIcon} alt="starIcon" className="h-4" />
          </div>
          <span className="bg-blue-100 w-30 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-1">
            {rating} / 5.0
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            ${price}
          </span>
          <span className="px-2 py-0.5 font-semibold text-sm text-blue-800">
            {discount} % off
          </span>
        </div>
        <div className="flex my-4">
          <button
            className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-7 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={addToCart}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
