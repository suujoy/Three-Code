import React, { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useGLTF, useAnimations } from "@react-three/drei";
import { OrbitControls } from "@react-three/drei";
import { Environment } from "@react-three/drei";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";

const Can = () => {
    gsap.registerPlugin(ScrollTrigger, useGSAP);

    const { camera, gl } = useThree();

    useEffect(() => {
        gl.toneMapping = THREE.ReinhardToneMapping;
        gl.outputColorSpace = THREE.SRGBColorSpace;

        camera.position.z = 18;
    }, []);

    // Models
    const [can, splash, splash2] = useGLTF([
        "/models/dew_model.glb",
        "/models/splash.glb",
        "/models/splash_2.glb",
    ]);

    const splashMaterialRef = useRef();
    const splas2hMaterialRef = useRef();

    useEffect(() => {
        splash.scene.traverse((child) => {
            if (child.isMesh) {
                splashMaterialRef.current = child.material;
            }
        });
        splash2.scene.traverse((child) => {
            if (child.isMesh) {
                splas2hMaterialRef.current = child.material;
            }
        });
    }, [splash]);

    const canRef = useRef();
    const splashRef = useRef();
    const splash2Ref = useRef();

    const groupRef = useRef();

    useEffect(() => {
        const lenis = new Lenis({
            duration: 4,
            smoothWheel: true,
            wheelMultiplier: 0.25,
        });

        lenis.on("scroll", ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);
    }, []);

    // gsap animation

    useGSAP(() => {
        if (!groupRef.current || !splashMaterialRef.current) return;

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

        tl.to(
            groupRef.current.rotation,
            {
                y: Math.PI * 1.5,
                z: -Math.PI / 12,
            },
            "first",
        )
            .to(
                groupRef.current.position,
                {
                    x: -3,
                    z: 4,
                },
                "first",
            )
            .to(
                splashRef.current.scale,
                {
                    x: 1.5,
                    y: 1.5,
                    z: 1.5,
                },
                "first",
            )
            .to(
                splashMaterialRef.current.color,
                {
                    r: 0.22,
                    g: 1,
                    b: 0.08,
                },
                "first",
            )
            .to(
                groupRef.current.rotation,
                {
                    y: Math.PI * 6,
                    z: 0.1,
                },
                "second",
            )
            .to(
                groupRef.current.position,
                {
                    x: 3,
                    z: 4,
                },
                "second",
            )
            .to(
                groupRef.current.scale,
                {
                    x: 0.7,
                    y: 0.7,
                    z: 0.7,
                },
                "second",
            )
            .to(
                splashRef.current.scale,
                {
                    x: 0.8,
                    y: 0.8,
                    z: 0.8,
                },
                "second",
            )
            .to(
                splas2hMaterialRef.current.color,
                {
                    r: 0.49,
                    g: 1,
                    b: 0,
                },
                "second",
            )
            .to(
                splash2Ref.current.scale,
                {
                    x: 0.01,
                    y: 0.01,
                    z: 0.01,
                },
                "second",
            )
            .to(
                groupRef.current.rotation,
                {
                    x: -Math.PI * 2,
                    y: -(Math.PI * 0.4),
                    z: -0.05,
                },
                "third",
            )
            .to(
                groupRef.current.position,
                {
                    x: 0,
                    y: 2,
                    z: 0,
                },
                "third",
            )
            .to(
                groupRef.current.scale,
                {
                    x: 0.5,
                    y: 0.5,
                    z: 0.5,
                },
                "third",
            )
            .to(
                splashRef.current.scale,
                {
                    x: 2,
                    y: 2,
                    z: 2,
                },
                "third",
            );
    }, [splashMaterialRef]);

    return (
        <>
            <group ref={groupRef} position={[-3 ,0,0]}>
                <primitive
                    ref={canRef}
                    object={can.scene}
                    position={[0, -2, 0]}
                    rotation={[0, Math.PI / 1.1, 0]}
                />

                <primitive
                    ref={splashRef}
                    object={splash.scene}
                    position={[0, 0, 0]}
                    scale={[0.5, 0.5, 0.5]}
                    rotation={[0, Math.PI / 1.1, 0]}
                />
                <primitive
                    ref={splash2Ref}
                    object={splash2.scene}
                    position={[0, 0, 0]}
                    scale={[0, 0, 0]}
                    rotation={[0, 1, 0]}
                />
            </group>
            {/* <axesHelper args={[5]} /> */}

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
            {/* Fill Light (soft shadow control) */}
            <directionalLight position={[-3, 2, 2]} intensity={0.1} />
            <directionalLight position={[-2, 3, -4]} intensity={1} />
            {/* Small ambient for base visibility */}
            <ambientLight intensity={0.5} />
        </>
    );
};

export default Can;
