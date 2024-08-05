import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { DecalGeometry } from "three/examples/jsm/geometries/DecalGeometry";

const createTextTexture = (text, color, fontSize = 64) => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = 512;
    canvas.height = 512;
    context.font = `${fontSize}px Arial`;
    context.fillStyle = color;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(text, canvas.width / 2, canvas.height / 2);
    return new THREE.CanvasTexture(canvas);
};

const Model = ({ tShirtColor1, tShirtColor2, elements }) => {
    // const { scene, cameras } = useGLTF("/human-tshirt-pants.glb");
    //IMPORTING IMAGES
    function importAll(r) {
        let images = {};
        r.keys().forEach((item, index) => {
            images[item.replace("./", "")] = r(item);
        });
        return images;
    }
    const model = importAll(
        require.context("./model", true, /\.(glb)$/)
    );
    const { scene, cameras } = useGLTF(model["human-tshirt-pants.glb"]);
    const { camera } = useThree();
    const decalMeshRef = useRef(new THREE.Group());

    useEffect(() => {
        scene.traverse((child) => {
            if (child.isMesh) {
                console.log(child)
                if (
                    child.name.includes("Tshirt_and_Jeans_2") ||
                    child.name.includes("Tshirt_and_Jeans_3")
                ) {
                    child.material = new THREE.MeshStandardMaterial({
                        color: tShirtColor2,
                    });
                }
                if (child.name.includes("Tshirt_and_Jeans_4")) {
                    child.material = new THREE.MeshStandardMaterial({
                        color: tShirtColor1,
                    });
                }
            }
            child.castShadow = true;
        });
    }, [tShirtColor1, tShirtColor2, scene]);

    const updateElements = () => {
        scene.traverse((child) => {
            if (child.isMesh && child.name.includes("Tshirt_and_Jeans_4")) {
                elements.forEach((element, index) => {
                    console.log(`Processing element ${index}:`, element);

                    const texture =
                        element.type === "image"
                            ? element.texture
                            : createTextTexture(
                                  element.content,
                                  element.color,
                                  element.size
                              );

                    if (texture) {
                        console.log(
                            `Creating decal material for element ${index}`
                        );
                        // Ensure texture does not repeat
                        texture.repeat.set(1, 1); // Set texture to show only once
                        texture.wrapS = THREE.ClampToEdgeWrapping; // clamp the texture to the edge along the s-axis
                        texture.wrapT = THREE.ClampToEdgeWrapping; // clamp the texture to the edge along the t-axis
                        console.log(texture);
                        const decalMaterial = new THREE.MeshBasicMaterial({
                            map: texture,
                            transparent: true,
                            depthTest: true,
                            depthWrite: true,
                            polygonOffset: true,
                            polygonOffsetFactor: -1,
                            side: THREE.FrontSide, // Ensure decals only show on front side
                        });

                        const position = new THREE.Vector3(
                            element.position.x,
                            element.position.y,
                            element.position.z
                        );

                        // Orientation must be correctly aligned to the surface normal
                        const orientation = new THREE.Euler(0, 0, 0);

                        const size = new THREE.Vector3(
                            element.type === "text"
                                ? element.scale.x * 30
                                : element.scale.x * 10,
                            element.type === "text"
                                ? element.scale.y * 30
                                : element.scale.y * 10,
                            element.scale.z * 20
                        );

                        const decalGeometry = new DecalGeometry(
                            child,
                            position,
                            orientation,
                            size
                        );

                        const decalMesh = new THREE.Mesh(
                            decalGeometry,
                            decalMaterial
                        );
                        decalMeshRef.current.add(decalMesh);
                        decalMesh.material.needsUpdate = true;
                    } else {
                        console.error(
                            `Texture is undefined for element ${index}`
                        );
                    }
                });
            }
        });
    };

    useEffect(() => {
        if (decalMeshRef.current) {
            while (decalMeshRef.current.children.length) {
                decalMeshRef.current.remove(decalMeshRef.current.children[0]);
            }
        }
        updateElements();
    }, [elements]);

    useEffect(() => {
        if (cameras && cameras.length > 0) {
            const gltfCamera = cameras[0];
            camera.position.copy(gltfCamera.position);
            camera.rotation.copy(gltfCamera.rotation);
            camera.fov = gltfCamera.fov;
            camera.updateProjectionMatrix();
        }
    }, [cameras, camera]);

    return (
        <>
            <primitive object={scene}>
                <group ref={decalMeshRef} />
            </primitive>
        </>
    );
};

export default Model;
