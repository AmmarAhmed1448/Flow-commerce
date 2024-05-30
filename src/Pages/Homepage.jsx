import { useContext, useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

import Card from "../Components/Card";
import Navbar from "../Components/Navbar";
import GroupedProductsContext from "../Contexts/GroupedProductsContext";
import SelectedCategoryContext from "../Contexts/SelectedCategoryContext";
import LeftDrawer from "../Components/LeftDrawer";
// import Carousel from '../Components/Carousel';

function Homepage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [groupedProducts, setGroupedProducts] = useState({});

  // const {categoryName} = useParams();

  const { setCategoryList, selectedCategory, setSelectedCategory, query, setQuery } = useContext(
    SelectedCategoryContext
  );

  // const url = categoryName ? `https://dummyjson.com/products/category/${categoryName}`: "https://dummyjson.com/products"

  useEffect(() => {
    function getAllProducts() {
      fetch("https://dummyjson.com/products")
        // fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch products");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data.products);
          setProducts(data.products);
        })
        .catch((error) => {
          console.log(error.message);
        })
        .finally(() => {
          setisLoading(false);
        });
    }
    getAllProducts();
  }, []);

  // const filteredProducts = selectedCategory
  //   ? products.filter((product) => product.category === selectedCategory)
  //   : products;

  // const filterBySearch = products.filter((item) => {
  //   return (
  //     item.title.toLowerCase().includes(query.toLowerCase()) ||
  //     item.brand.toLowerCase().includes(query.toLowerCase()) ||
  //     item.description.toLowerCase().includes(query.toLowerCase()) ||
  //     item.category.toLowerCase().includes(query.toLowerCase())
  //   );
  // });

  //* returns a new object where products are grouped by their category
  const groupProducts = (products) => {
    return products.reduce((acc, products) => {
      const category = products.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(products);
      return acc;
    }, {});
  };

  useEffect(() => {
    const filterProducts = () => {
      let filtered = products;
      
      
      //* Filter by query 
      if (query) {
        console.log("query-------",query);
        console.log("filteredsfdsfs-------",filtered);
        filtered = filtered.filter((items) => {
          console.log(`${items.title} ### ${items.brand} ### ${items.category} ### ${items.description}`)
          return [items.title, items.brand, items.category, items.description].some(
            field => field && field.toLowerCase().includes(query.toLowerCase())
          );
        });
        console.log("filtered2-------",filtered);
      }
  
      //* Filter by category
      else if(selectedCategory){
        filtered = filtered.filter((items) => items.category === selectedCategory)
      }
  
      return filtered;
    };
  
    setGroupedProducts(groupProducts(filterProducts()));
  }, [products, query, selectedCategory]);


  useEffect(() => {
    setQuery("");
  }, [selectedCategory])


  // const groupedProducts = filterBySearch.reduce((acc, product) => {
  //   const { category } = product;
  //   if (!acc[category]) {
  //     acc[category] = [];
  //   }
  //   acc[category].push(product);
  //   return acc;
  // }, {});

  useEffect(() => {
    setCategoryList(Object.keys(groupedProducts));
    console.log(Object.keys(groupedProducts));
  }, [products]);

  // const filteredProducts = selectedCategory
  //   ? products.filter((product) => product.category === selectedCategory)
  //   : products;
  console.log(groupedProducts);

  return (
    <GroupedProductsContext.Provider value={groupedProducts}>
      <Navbar />
      {/* <LeftDrawer /> */}
      {/* <Carousel /> */}
      {isLoading ? (
        <div role="status" className="flex justify-center items-center h-[40vh]">
        <svg aria-hidden="true" class="inline w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <span class="sr-only">Loading...</span>
    </div>
      ) : (
        <div>
          {Object.entries(groupedProducts).map(([category, prod]) => (
            <div key={category} className="">
              <h1
                className="text-2xl h-12 my-8 font-bold flex items-center bg-gray-50 text-blue-800
              px-8
              md:px-20
              "
              >
                {category}
              </h1>

              <div className="grid grid-cols-12 gap-3 md:gap-4 mx-2 md:mx-4">
                {prod.map((product) => (
                  <Card
                    key={product.id}
                    title={product.title}
                    description={product.description}
                    price={product.price}
                    discount={product.discountPercentage}
                    rating={product.rating}
                    stock={product.stock}
                    thumbnail={product.thumbnail}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </GroupedProductsContext.Provider>
  );
}
export default Homepage;
