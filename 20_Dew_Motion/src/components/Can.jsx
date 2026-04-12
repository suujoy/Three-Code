import React, { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useGLTF, useAnimations } from "@react-three/drei";
// import { OrbitControls } from "@react-three/drei";
import { Environment } from "@react-three/drei";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";

const Can = () => {
    gsap.registerPlugin(ScrollTrigger, useGSAP);

    const model = useGLTF("/models/dew_model.glb");

    const canModel = useRef();

    useEffect(() => {
        const lenis = new Lenis();

        lenis.on("scroll", ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);
    }, []);

    useEffect(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".section-one",
                start: "top top",
                endTrigger: ".section-three",
                end: "bottom bottom",
                markers: true,
                scrub: true,
            },
        });

        tl.to(canModel.current.rotation, {
            y: Math.PI / 2,
        });
    }, []);

    return (
        <>
            <primitive
                ref={canModel}
                object={model.scene}
                position={[0, -2, 0]}
                rotation={[0, Math.PI / 1.1, 0]}
            />
            <Environment files={"/studio_2k.hdr"} intensity={0.5} />
            {/* <OrbitControls /> */}
            {/* Key Light (main) */}
            <directionalLight position={[1, 4, 4]} intensity={2} />
            <pointLight
                position={[1, 2, 3]}
                intensity={2}
                distance={10}
                decay={2}
            />
            ``
            {/* Fill Light (soft shadow control) */}
            <directionalLight position={[-3, 2, 2]} intensity={0.1} />
            <directionalLight position={[-2, 3, -4]} intensity={1} />
            {/* Small ambient for base visibility */}
            <ambientLight intensity={0.03} />
        </>
    );
};

export default Can;
