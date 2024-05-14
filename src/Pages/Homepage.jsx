import { useEffect, useState } from "react";
import Card from "../Components/Card";
import Navbar from "../Components/Navbar";
// import Carousel from '../Components/Carousel';

function Homepage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    function getAllProducts() {
      fetch("https://dummyjson.com/products")
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

  const groupedProducts = products.reduce((acc, product) => {
    const { category } = product;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {});

  console.log(groupedProducts);

  return (
    <>
      <Navbar />
      {/* <Carousel /> */}
      {isLoading ? (
        <div className="text-xl font-medium">Loading products...</div>
      ) : (
        <div>
          {Object.entries(groupedProducts).map(([category, prod]) => (
            <div key={category} className="">
              <h1 className="text-2xl h-12 my-8 font-bold flex items-center bg-gray-50 text-blue-800
              px-8
              md:px-20
              ">
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
    </>
  );
}
export default Homepage;
