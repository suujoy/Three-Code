import React, { useEffect, useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import {
    OrbitControls,
    useGLTF,
    useTexture,
    useAnimations,
} from "@react-three/drei";
import { normalMap, texture } from "three/tsl";
import * as THREE from "three";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Dog = () => {
    gsap.registerPlugin(useGSAP);
    gsap.registerPlugin(ScrollTrigger);

    const model = useGLTF("/models/dog.drc.glb");

    useThree(({ camera, scene, gl }) => {
        ((gl.toneMapping = THREE.ReinhardToneMapping),
            (gl.outputColorSpace = THREE.SRGBColorSpace));
        camera.position.z = 0.55;
    });

    const { actions } = useAnimations(model.animations, model.scene);

    useEffect(() => {
        actions["Take 001"].play();
    }, [actions]);

    const [normalMap] = useTexture(["/dog_normals.jpg"]).map((texture) => {
        texture.flipY = false;
        texture.colorSpace = THREE.SRGBColorSpace;
        return texture;
    });
    const [
        mat1,
        mat2,
        mat3,
        mat4,
        mat5,
        mat6,
        mat7,
        mat8,
        mat9,
        mat10,
        mat11,
        mat12,
        mat13,
        mat14,
        mat15,
        mat16,
        mat17,
        mat18,
        mat19,
        mat20,
    ] = useTexture([
        "/matcap/mat-1.png",
        "/matcap/mat-2.png",
        "/matcap/mat-3.png",
        "/matcap/mat-4.png",
        "/matcap/mat-5.png",
        "/matcap/mat-6.png",
        "/matcap/mat-7.png",
        "/matcap/mat-8.png",
        "/matcap/mat-9.png",
        "/matcap/mat-10.png",
        "/matcap/mat-11.png",
        "/matcap/mat-12.png",
        "/matcap/mat-13.png",
        "/matcap/mat-14.png",
        "/matcap/mat-15.png",
        "/matcap/mat-16.png",
        "/matcap/mat-17.png",
        "/matcap/mat-18.png",
        "/matcap/mat-19.png",
        "/matcap/mat-20.png",
    ]).map((texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        return texture;
    });

    const material = useRef({
        uMatcap1: {
            value: mat19,
        },
        uMatcap2: {
            value: mat2,
        },
        uProgress: {
            value: 1.0,
        },
    });

    const [branchMap, branchNormalMap] = useTexture([
        "/branches_diffuse.jpg",
        "/branches_normals.jpg",
    ]).map((texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        return texture;
    });

    const dogMaterial = new THREE.MeshMatcapMaterial({
        normalMap: normalMap,
        matcap: mat2,
    });

    const branchMaterial = new THREE.MeshMatcapMaterial({
        // map: branchMap,
        normalMap: branchNormalMap,
        matcap: mat2,
    });

    const onBeforeCompile = (shader) => {
        shader.uniforms.uMatcapTexture1 = material.current.uMatcap1;
        shader.uniforms.uMatcapTexture2 = material.current.uMatcap2;
        shader.uniforms.uProgress = material.current.uProgress;

        // Store reference to shader uniforms for GSAP animation

        shader.fragmentShader = shader.fragmentShader.replace(
            "void main() {",

            `
                uniform sampler2D uMatcapTexture1;
                uniform sampler2D uMatcapTexture2;
                uniform float uProgress;

                void main() {
            `,
        );

        shader.fragmentShader = shader.fragmentShader.replace(
            "vec4 matcapColor = texture2D( matcap, uv );",

            `
                vec4 matcapColor1 = texture2D( uMatcapTexture1, uv );
                vec4 matcapColor2 = texture2D( uMatcapTexture2, uv );
                float transitionFactor = 0.2;

                float progress = smoothstep(uProgress - transitionFactor,uProgress, (vViewPosition.x+vViewPosition.y)*0.5+0.5 );

                vec4 matcapColor = mix(matcapColor2, matcapColor1, progress );
            `,
        );
    };

    dogMaterial.onBeforeCompile = onBeforeCompile;
    branchMaterial.onBeforeCompile = onBeforeCompile;

    useEffect(() => {
        // Tomorrowland

        document
            .querySelector(`.title[img-title="tomoroland"]`)
            .addEventListener("mouseenter", () => {
                material.current.uMatcap1.value = mat19;

                gsap.to(material.current.uProgress, {
                    value: 0.0,
                    duration: 0.5,
                    onComplete: () => {
                        material.current.uMatcap2.value =
                            material.current.uMatcap1.value;
                        material.current.uProgress.value = 1.0;
                    },
                });
            });

        document
            .querySelector(`.title[img-title="navi-pier"]`)
            .addEventListener("mouseenter", () => {
                material.current.uMatcap1.value = mat8;

                gsap.to(material.current.uProgress, {
                    value: 0.0,
                    duration: 0.5,
                    onComplete: () => {
                        material.current.uMatcap2.value =
                            material.current.uMatcap1.value;
                        material.current.uProgress.value = 1.0;
                    },
                });
            });

        document
            .querySelector(`.title[img-title="msi-chicago"]`)
            .addEventListener("mouseenter", () => {
                material.current.uMatcap1.value = mat9;

                gsap.to(material.current.uProgress, {
                    value: 0.0,
                    duration: 0.5,
                    onComplete: () => {
                        material.current.uMatcap2.value =
                            material.current.uMatcap1.value;
                        material.current.uProgress.value = 1.0;
                    },
                });
            });

        document
            .querySelector(`.title[img-title="louises"]`)
            .addEventListener("mouseenter", () => {
                material.current.uMatcap1.value = mat12;

                gsap.to(material.current.uProgress, {
                    value: 0.0,
                    duration: 0.5,
                    onComplete: () => {
                        material.current.uMatcap2.value =
                            material.current.uMatcap1.value;
                        material.current.uProgress.value = 1.0;
                    },
                });
            });

        document
            .querySelector(`.title[img-title="kikk-festival"]`)
            .addEventListener("mouseenter", () => {
                material.current.uMatcap1.value = mat10;

                gsap.to(material.current.uProgress, {
                    value: 0.0,
                    duration: 0.5,
                    onComplete: () => {
                        material.current.uMatcap2.value =
                            material.current.uMatcap1.value;
                        material.current.uProgress.value = 1.0;
                    },
                });
            });

        document
            .querySelector(`.title[img-title="kennedy-center"]`)
            .addEventListener("mouseenter", () => {
                material.current.uMatcap1.value = mat11;

                
                gsap.to(material.current.uProgress, {
                    value: 0.0,
                    duration: 0.5,
                    onComplete: () => {
                        material.current.uMatcap2.value =
                            material.current.uMatcap1.value;
                        material.current.uProgress.value = 1.0;
                    },
                });
            });

        document
            .querySelector(`.title[img-title="royal-opera"]`)
            .addEventListener("mouseenter", () => {
                material.current.uMatcap1.value = mat13;

                
                gsap.to(material.current.uProgress, {
                    value: 0.0,
                    duration: 0.5,
                    onComplete: () => {
                        material.current.uMatcap2.value =
                            material.current.uMatcap1.value;
                        material.current.uProgress.value = 1.0;
                    },
                });
            });
        document
            .querySelector(`.titles`)
            .addEventListener("mouseleave", () => {
                material.current.uMatcap1.value = mat2;

                
                gsap.to(material.current.uProgress, {
                    value: 0.0,
                    duration: 0.5,
                    onComplete: () => {
                        material.current.uMatcap2.value =
                            material.current.uMatcap1.value;
                        material.current.uProgress.value = 1.0;
                    },
                });
            });
    }, []);

    model.scene.traverse((child) => {
        if (child.name.includes("DOG")) {
            child.material = dogMaterial;
        } else {
            child.material = branchMaterial;
        }
    });

    const dogModel = useRef(model);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#section-1",
                endTrigger: "#section-4",
                start: "top top",
                end: "bottom bottom",
                scrub: true,
            },
        });

        tl.to(dogModel.current.scene.position, {
            z: "-=0.4",
            y: "+=.01",
        })
            .to(dogModel.current.scene.rotation, {
                x: `+=${Math.PI / 16}`,
            })
            .to(
                dogModel.current.scene.rotation,
                {
                    y: `-=${Math.PI}`,
                },
                "third",
            )
            .to(
                dogModel.current.scene.position,
                {
                    x: "-=.45",
                    z: "+=.4",
                    y: "+=.01",
                },
                "third",
            );
    }, []);

    return (
        <>
            <primitive
                object={model.scene}
                position={[0.25, -0.6, 0]}
                rotation={[0, Math.PI / 6, 0]}
            />
            {/* <OrbitControls /> */}
            <directionalLight
                position={[0, 10, 5]}
                intensity={10}
                color={0xffffff}
            />
            <ambientLight intensity={2} color={0xffffff} />
        </>
    );
};

export default Dog;
