import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useProduct } from "../hooks/useProduct";
import { products } from "../data/products";

const Can = () => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(useGSAP);

    // Moodel import
    const can = useGLTF("/models/can_model.glb");
    const splash = useGLTF("/models/water_splash.glb");
    const splash2 = useGLTF("/models/splash.glb");

    // Reference to the materials
    const splash1Mats = useRef([]);
    const splash2Mats = useRef([]);

    // Reference to the group
    const groupRef = useRef();
    const splashGroupRef = useRef();

    useEffect(() => {
        splash.scene.traverse((child) => {
            if (child.isMesh) {
                splash1Mats.current.push(child.material);
            }
        });

        splash2.scene.traverse((child) => {
            if (child.isMesh) {
                splash2Mats.current.push(child.material);
            }
        });
    }, [splash, splash2]);

    const { currentIndex } = useProduct();
    const texture = useTexture(products[currentIndex].texture);

    useEffect(() => {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;

        texture.repeat.set(1, 1.7);
        // texture.offset.set(0, -0.1);

        can.scene.traverse((child) => {
            if (child.isMesh) {
                child.material.map = texture;
                child.material.needsUpdate = true;
            }
        });

        // Remove the glass from the water splash and remove 1 splash mesh
        splash.scene.traverse((child) => {
            if (child.isMesh && child.name === "Boole_Mat_0") {
                child.visible = false;
            }
            if (child.isMesh && child.name === "Mesher_2_Mat1_0") {
                child.visible = false;
            }
        });
    }, [texture, can, splash]);

    const { camera, gl } = useThree();

    useEffect(() => {
        gl.toneMapping = THREE.ReinhardToneMapping;
        gl.outputColorSpace = THREE.SRGBColorSpace;

        camera.position.z = 18;
        1;
    }, []);

    // GSAP

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: "",
                start: "top top",
                end: "bottom bottom",
                scrub: true,
                pin: true,
            },
        });
    });

    useFrame(() => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.003;
        }
    });

    return (
        <>
            <group ref={groupRef} scale={1.8}>
                <primitive
                    object={can.scene}
                    position={[0.1, -1, -0.35]}
                    // rotation={[0, 0, 0]}
                    rotation={[0, 0, .1]}
                    scale={15}
                />
                <group ref={splashGroupRef}>
                    <primitive
                        object={splash.scene}
                        position={[-0.13, -1.1, 0.19]}
                        rotation={[0, 0, 0]}
                        scale={0}
                    />
                    <primitive
                        object={splash2.scene}
                        position={[0, 0, -0.1]}
                        rotation={[0, 0, 0]}
                        scale={0.5}
                    />
                </group>
            </group>

            {/* <axesHelper args={[5]} /> */}
            <OrbitControls />

            <ambientLight intensity={5} />
            <directionalLight position={[5, 5, 5]} intensity={10} />
        </>
    );
};

export default Can;
