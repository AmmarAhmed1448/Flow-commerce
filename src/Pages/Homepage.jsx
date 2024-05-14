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
        .catch(error => {
            console.log(error.message);
        })
        .finally(() => {
            setisLoading(false);
        })
    }
    getAllProducts();
  }, []);
  return (
    <>
      <Navbar />
      {/* <Carousel /> */}
      {isLoading ? (
        <div className="text-xl font-medium">Loading products...</div>
      ) : (
        <div className="flex justify-center items-start flex-wrap gap-4 py-8">
          {products.map((product) => (
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
      )}
    </>
  );
}
export default Homepage;
