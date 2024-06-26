import { useState } from "react";
import SelectedCategoryContext from "./SelectedCategoryContext";

function ProductState({ children }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryList, setCategoryList] = useState([]);
  const [query, setQuery] = useState("");
  const [cartItems, setCartItems] = useState([]);

  const value = {
    selectedCategory,
    setSelectedCategory,
    categoryList,
    setCategoryList,
    query, 
    setQuery,
    cartItems,
    setCartItems
  };
  return (
    <SelectedCategoryContext.Provider value={value}>
      {children}
    </SelectedCategoryContext.Provider>
  );
}

export default ProductState;
