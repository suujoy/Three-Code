import { createContext, useState } from "react";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [currentIndex, setCurrentIndex] = useState(3);

    return (
        <ProductContext.Provider value={{ currentIndex, setCurrentIndex }}>
            {children}
        </ProductContext.Provider>
    );
};
