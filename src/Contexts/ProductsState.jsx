import { useState } from "react";
import SelectedCategoryContext from "./SelectedCategoryContext";

function ProductState({children}){
    const [selectedCategory, setSelectedCategory] = useState(null);
    const value = {
        selectedCategory,
        setSelectedCategory
    }
    return(
        <SelectedCategoryContext.Provider value = {value}>
            {children}
        </SelectedCategoryContext.Provider>
    )
}


export default ProductState;