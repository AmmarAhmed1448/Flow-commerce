import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import GroupedProductsContext from "../Contexts/GroupedProductsContext";
import SelectedCategoryContext from "../Contexts/SelectedCategoryContext";


function Dropdown() {
    const [isOpen, setisOpen] = useState(false);
    //   const [groupedProducts, setgroupedProducts] = useState([]);
    
    //   const groupedProducts = useContext(GroupedProductsContext);
    
    const toggleDropdown = () => {
        setisOpen(!isOpen);
    };
    
    
    const groupedProducts = useContext(GroupedProductsContext);
    const {categoryList, setSelectedCategory, selectedCategory} = useContext(SelectedCategoryContext);

//   useEffect(() => {
//     const getCategories = () => {
//         fetch("https://dummyjson.com/products/categories")
//         .then((response) => {
//             if (!response.ok) {
//               throw new Error("Failed to fetch products");
//             }
//             return response.json();
//           })
//           .then((data) => {
//             console.log(data);
//             setgroupedProducts(data);
//           })
//           .catch((error) => {
//             console.log(error.message);
//           })
//     }

//     getCategories();
//   }, [])
  console.log(groupedProducts);
  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          id="menu-button"
          onClick={toggleDropdown}
          aria-expanded="true"
          aria-haspopup="true"
        >
          {selectedCategory ? selectedCategory : "Categories"}
          <svg
            className="-mr-1 h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {/* <!--
    Dropdown menu, show/hide based on menu state.

    Entering: "transition ease-out duration-100"
      From: "transform opacity-0 scale-95"
      To: "transform opacity-100 scale-100"
    Leaving: "transition ease-in duration-75"
      From: "transform opacity-100 scale-100"
      To: "transform opacity-0 scale-95"
  --> */}
      {isOpen && (
        <div
          className="absolute left-0 z-10 mt-2 w-32 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none max-h-56 overflow-y-auto"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1"
          onClick={toggleDropdown}
        >
          <div className="py-1" role="none">
            {/* <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" --> */}
            <button
              className="text-gray-700 block px-4 py-2 text-sm font-semibold"
              role="menuitem"
              tabIndex="-1"
              id="menu-item-deselect"
              onClick={() => { setSelectedCategory(""); }}
            >
              Deselect
            </button>
            {categoryList.map((item, index) => (
              <button
                key={index}
                // to='/'
                className="text-gray-700 block px-4 py-2 text-sm"
                role="menuitem"
                tabIndex="-1"
                id="menu-item-0"
                onClick={() => {setSelectedCategory(item)}}
              >
                {item}
              </button>
            ))}
            {/* <Link
              to="/"
              className="text-gray-700 block px-4 py-2 text-sm"
              role="menuitem"
              tabIndex="-1"
              id="menu-item-0"
            >
              Account settings
            </Link>
            <Link
              to="/"
              className="text-gray-700 block px-4 py-2 text-sm"
              role="menuitem"
              tabIndex="-1"
              id="menu-item-1"
            >
              Support
            </Link>
            <Link
              to="/"
              className="text-gray-700 block px-4 py-2 text-sm"
              role="menuitem"
              tabIndex="-1"
              id="menu-item-2"
            >
              License
            </Link> */}
            {/* <form method="POST" action="#" role="none">
              <button
                type="submit"
                className="text-gray-700 block w-full px-4 py-2 text-left text-sm"
                role="menuitem"
                tabIndex="-1"
                id="menu-item-3"
              >
                Sign out
              </button>
            </form> */}
          </div>
        </div>
      )}
    </div>
  );
}

export default Dropdown;
