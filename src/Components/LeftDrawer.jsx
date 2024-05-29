import React, { useState, useEffect } from "react";
import hamburger from "../assets/hamburger.png";
function LeftDrawer() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [links, setLinks] = useState({ main: [], otherLinks: [] });

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  useEffect(() => {
    // Mock API call
    const fetchLinks = async () => {
      const data = await new Promise((resolve) =>
        setTimeout(() => {
          resolve({
            Main: [
              "Home", "About Us", "Services", "Products", "Careers", "Blog",
              "News", "Events", "FAQ", "Support"
            ],
            OtherLinks: [
              "Contact Us", "Privacy Policy", "Terms of Service", "Feedback",
              "Partnerships", "Investors", "Sustainability", "Diversity & Inclusion",
              "Innovation", "Community"
            ],
            Resources: [
              "Documentation", "API Reference", "Guides", "Tutorials",
              "White Papers", "Case Studies", "E-books", "Webinars",
              "Workshops", "Training"
            ],
            Company: [
              "About", "Team", "History", "Careers", "Press", "Locations"
            ],
            Support: [
              "Help Center", "Contact Support", "Knowledge Base", "System Status",
              "Product Updates"
            ],
            Community: [
              "Forums", "User Groups", "Events", "Meetups", "Hackathons",
              "Conferences"
            ],
            Services: [
              "Consulting", "Custom Solutions", "Training", "Support Services",
              "Managed Services", "Implementation"
            ],
            Contact: [
              "Contact Form", "Email Us", "Call Us", "Live Chat", "Office Locations"
            ],
            Legal: [
              "Privacy Policy", "Terms of Service", "Cookie Policy", "Data Protection",
              "Compliance"
            ]
          });
        }, 1000)
      );
      setLinks(data);
    };

    fetchLinks();
  }, []);

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
  const userName = "Sign In"; // Replace with actual user name
  const userEmail = "Please log in"; // Replace with actual user email

  return (
    <>
      {/* Drawer Init and Toggle */}
      <div className="text-center">
        <button
          className="text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          type="button"
          onClick={toggleDrawer}
        >
          <img src={hamburger} alt="hamburger" className="h-8" />
        </button>
      </div>

      {/* Drawer Overlay */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleDrawer}
        ></div>
      )}

      {/* Drawer Component */}
      <div
        id="drawer-example"
        className={`fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        } bg-white md:w-10/12 lg:w-2/6 w-full dark:bg-gray-800`}
        tabIndex="-1"
        aria-labelledby="drawer-label"
      >
        <h5
          id="drawer-label"
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
          Useful Links
        </h5>
        <button
          type="button"
          onClick={toggleDrawer}
          aria-controls="drawer-example"
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
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
          <div className="mb-4">
            <h5 className="text-lg font-semibold text-gray-900 dark:text-white">
              {userName}
            </h5>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {userEmail}
            </p>
          </div>

          {Object.entries(links).map(([category, categoryLinks]) => (
            <div key={category} className="mb-4">
              <h6 className="font-semibold py-4 text-gray-900 dark:text-white">
                {category}
              </h6>
              <ul className="space-y-2">
                {categoryLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="block px-4 py-2 text-gray-900 bg-white hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default LeftDrawer;
