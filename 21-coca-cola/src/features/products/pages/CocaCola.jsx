import React from "react";
import Can from "../components/Can";
import { Canvas } from "@react-three/fiber";
import "../styles/cocaCola.css";
import Slider from "../components/Slider";
import { products } from "../data/products";
import { useProduct } from "../hooks/useProduct";

const CocaCola = () => {
    const { currentIndex } = useProduct();

    return (
        <main>
            <section
                className="canvas-section"
                style={{
                    background: products[currentIndex].gradient,
                }}
            >
                <Canvas
                    id="canvas-elem"
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        zIndex: 1,
                        pointerEvents: "none",
                    }}
                    camera={{ fov: 20, position: [0, 0, 18] }}
                >
                    <Can />
                </Canvas>

                <Slider />
            </section>
        </main>
    );
};

export default CocaCola;
