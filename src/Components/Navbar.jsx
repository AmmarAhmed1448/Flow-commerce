import { Link } from "react-router-dom";
import SearchbarWithDropdown from "./Searchbar";
import Dropdown from "./Dropdown";
import RightDrawer from "./RightDrawer";
import LeftDrawer from "./LeftDrawer";

export default function Navbar() {
  const subLinks = ["Home"] 
  // "Company", "Team", "Features", "Pricing", "Contact Us", "Blog", "Careers", "FAQ", "Support", "Services", "Portfolio", "Testimonials", "Events"];

  return (
    <>
      <nav className="bg-gray-50 border-gray-200 dark:bg-gray-900">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl py-4">
          
          <div className="">
            <LeftDrawer />
          </div>
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Logo"
            />
            <span className="self-center  text-2xl font-semibold whitespace-nowrap dark:text-white">
              Ammar
            </span>
          </Link>


          <div className="w-full md:w-6/12 lg:w-9/12 hidden md:block">
          <SearchbarWithDropdown />
          </div>

          
          <div className="flex  items-center gap-x-4">
          <Link
            to="/"
            className="text-md text-blue-600 dark:text-blue-500 hover:underline"
            >
            Login
          </Link>

          <RightDrawer/>
          </div>

          <div className="w-full md:w-8/12 sm:hidden block mt-4">
          <SearchbarWithDropdown />
          </div>
          

            

          {/* <div className="flex items-center space-x-6 rtl:space-x-reverse">

            <Link
              to="/"
              className="text-sm  text-gray-500 dark:text-white hover:underline"
            >
              (555) 412-1234
            </Link>
            
            <Link
              to="/"
              className="text-sm text-blue-600 dark:text-blue-500 hover:underline"
            >
              Login
            </Link>
          </div> */}
        </div>
      </nav>

      <nav className="bg-gray-50 dark:bg-gray-700">
        <div className="max-w-screen-xl px-4 py-3 mx-auto">
          <div className="flex items-center  gap-8">
            <Dropdown />
            {/* <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
              {subLinks.map((link, index) => (
                <li key={index}>
                <Link
                  to="/"
                  className="text-gray-900 dark:text-white hover:underline"
                  aria-current="page"
                >
                  {link}
                </Link>
              </li>
              ))}
              {/* <li>
                <Link
                  to="/"
                  className="text-gray-900 dark:text-white hover:underline"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-gray-900 dark:text-white hover:underline"
                >
                  Company
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-gray-900 dark:text-white hover:underline"
                >
                  Team
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-gray-900 dark:text-white hover:underline"
                >
                  Features
                </Link>
              </li> */}
            {/* </ul> */} 
          </div>
        </div>
      </nav>

      {/* <h1>Ammar</h1> */}
    </>
  );
}
