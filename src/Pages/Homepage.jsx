import { useContext, useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

import Card from "../Components/Card";
import Navbar from "../Components/Navbar";
import GroupedProductsContext from "../Contexts/GroupedProductsContext";
import SelectedCategoryContext from "../Contexts/SelectedCategoryContext";
// import LeftDrawer from "../Components/LeftDrawer";
// import Carousel from '../Components/Carousel';

function Homepage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  // const {categoryName} = useParams();

  const { setCategoryList, selectedCategory, query } = useContext(
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

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;


    const filterBySearch = products.filter((item) => {
      return (
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.brand.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      )       
    });



  const groupedProducts = filterBySearch.reduce((acc, product) => {
    const { category } = product;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {});

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
        <div className="text-xl font-medium">Loading products...</div>
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

              <div className="flex justify-center items-start flex-wrap gap-4">
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
