// components/Slider.jsx

import { useEffect, useRef, useState } from "react";
import { useProduct } from "../hooks/useProduct";
import { products } from "../data/products";
import "../styles/slider.css";

const AUTO_SLIDE_MS = 4000;

const Slider = () => {
    const { currentIndex, handleNext, handlePrev } = useProduct();
    const product = products[currentIndex];

    const sliderRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    // Detect viewport
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.3 },
        );

        if (sliderRef.current) observer.observe(sliderRef.current);

        return () => observer.disconnect();
    }, []);

    // Control auto-slide (pause logic)
    useEffect(() => {
        if (isHovered || !isVisible) return;

        const timeoutId = setTimeout(() => {
            handleNext();
        }, AUTO_SLIDE_MS);

        return () => clearTimeout(timeoutId);
    }, [currentIndex, handleNext, isHovered, isVisible]);

    return (
        <div
            ref={sliderRef}
            className="slider"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="bg-text">COCA COLA</div>

            <div className="content">
                {/* LEFT */}
                <div className="left">
                    <h1>{product.title}</h1>
                    <p>{product.description}</p>

                    <div className="tags">
                        {product.productTags.map((tag, i) => (
                            <span key={i}>{tag}</span>
                        ))}
                    </div>
                </div>

                {/* RIGHT BUTTON */}
                <div className="right">
                    <button
                        style={{ borderColor: product.btnColor }}
                        className="btn"
                    >
                        Explore
                    </button>
                </div>
            </div>

            {/* SLIDER NAV */}
            <div className="nav">
                <button
                    onClick={() => {
                        handlePrev();
                    }}
                >
                    ←
                </button>

                <div className="progress">
                    <div
                        key={currentIndex}
                        className="progress-fill"
                        style={{
                            animationDuration: `${AUTO_SLIDE_MS}ms`,
                            animationPlayState:
                                isHovered || !isVisible ? "paused" : "running",
                        }}
                    />
                </div>

                <button
                    onClick={() => {
                        handleNext();
                    }}
                >
                    →
                </button>
            </div>
        </div>
    );
};

export default Slider;
