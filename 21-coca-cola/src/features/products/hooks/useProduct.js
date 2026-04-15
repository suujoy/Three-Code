import { useContext } from "react";
import { ProductContext } from "../product.context";
import { products } from "../data/products";

export const useProduct = () => {
    const { currentIndex, setCurrentIndex } = useContext(ProductContext);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % products.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? products.length - 1 : prev - 1,
        );
    };

    const handleSetIndex = (index) => {
        setCurrentIndex(index);
    };

    return {
        currentIndex,
        handleNext,
        handlePrev,
        handleSetIndex,
    };
};
