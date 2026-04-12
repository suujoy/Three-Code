import React from "react";
import { Canvas } from "@react-three/fiber";
import Can from "./Can";
import "../styles/canvass.scss";

const Canvass = () => {
    return (
        <Canvas
            id="canvas-elem"
            style={{
                height: "100vh",
                width: "100vw",
                position: "fixed",
                top: 0,
                left: 0,
                zIndex: 1,
            }}
        >
            <Can />
        </Canvas>
    );
};

export default Canvass;
