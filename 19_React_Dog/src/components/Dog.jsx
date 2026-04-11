import React, { useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import {
    OrbitControls,
    useGLTF,
    useTexture,
    useAnimations,
} from "@react-three/drei";
import { normalMap, texture } from "three/tsl";
import * as THREE from "three";

const Dog = () => {
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

    const [normalMap, sampleMatcap] = useTexture([
        "/dog_normals.jpg",
        "/matcap/mat-2.png",
    ]).map((texture) => {
        texture.flipY = false;
        texture.colorSpace = THREE.SRGBColorSpace;
        return texture;
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
        matcap: sampleMatcap,
    });

    const branchMaterial = new THREE.MeshMatcapMaterial({
        map: branchMap,
        normalMap: branchNormalMap,
    });

    model.scene.traverse((child) => {
        if (child.name.includes("DOG")) {
            child.material = dogMaterial;
        } else {
            child.material = branchMaterial;
        }
    });

    return (
        <>
            <primitive
                object={model.scene}
                position={[0.25, -0.6, 0]}
                rotation={[0, Math.PI / 6, 0]}
            />
            <OrbitControls />
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
