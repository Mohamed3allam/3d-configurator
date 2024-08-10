import React, { useEffect, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
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

const cameraPositions = {
    front: new THREE.Vector3(0, 0, 3),
    back: new THREE.Vector3(0, 0, -3),
    right: new THREE.Vector3(2, 1, -0.1), // Closer to the model
    left: new THREE.Vector3(-2, 1, -0.1), // Closer to the model
};

//IMPORTING IMAGES
function importAll(r) {
    let images = {};
    r.keys().forEach((item, index) => {
        images[item.replace("./", "")] = r(item);
    });
    return images;
}

const Model = ({
    side,
    tShirtColor1,
    tShirtColor2,
    frontElements,
    backElements,
    leftElements,
    rightElements,
}) => {
    const model = importAll(require.context("./model", true, /\.(glb)$/));
    const { scene, cameras } = useGLTF(model["polo_white_tshirt.glb"]);
    const { camera } = useThree();
    const [targetPosition, setTargetPosition] = useState(
        camera.position.clone()
    );
    const [positionChanged, setPositionChanged] = useState(false);

    const frontDecalMeshRef = useRef(new THREE.Group());
    const backDecalMeshRef = useRef(new THREE.Group());
    const leftDecalMeshRef = useRef(new THREE.Group());
    const rightDecalMeshRef = useRef(new THREE.Group());

    // T-SHIRT COLORS CONTROLLING
    useEffect(() => {
        scene.traverse((child) => {
            if (child.isMesh) {
                if (
                    child.name === "polySurface37_re_work_phong1__0" ||
                    child.name === "polySurface3_re_work_phong1__0" ||
                    child.name === "polySurface38_re_work_phong1__0"
                ) {
                    child.material = new THREE.MeshStandardMaterial({
                        color: tShirtColor2,
                    });
                }
                if (
                    child.name === "ShirtpolySurface36_re_work_phong1__0" ||
                    child.name === "ShirtpolySurface38_re_work_phong1__0" ||
                    child.name === "ShirtpolySurface39_re_work_phong1__0" ||
                    child.name === "polySurface4_re_work_phong1__0"
                ) {
                    child.material = new THREE.MeshStandardMaterial({
                        color: tShirtColor1,
                    });
                }
            }
            child.castShadow = true;
        });
    }, [tShirtColor1, tShirtColor2, scene]);

    // FRONT SIDE ELEMENTS CONTROL
    const updateFrontElements = () => {
        scene.traverse((child) => {
            if (
                child.isMesh &&
                child.name.includes("ShirtpolySurface36_re_work_phong1__0")
            ) {
                frontElements.forEach((element, index) => {
                    const texture =
                        element.type === "image"
                            ? element.texture
                            : createTextTexture(
                                  element.content,
                                  element.color,
                                  element.size
                              );

                    if (texture) {
                        // Ensure texture does not repeat
                        texture.repeat.set(1, 1); // Set texture to show only once
                        const decalMaterial = new THREE.MeshBasicMaterial({
                            map: texture,
                            transparent: true,
                            depthTest: true,
                            depthWrite: true,
                            polygonOffset: true,
                            polygonOffsetFactor: -1,
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
                                ? element.scale.x
                                : element.scale.x,
                            element.type === "text"
                                ? element.scale.y
                                : element.scale.y,
                            element.scale.z * 1
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
                        frontDecalMeshRef.current.add(decalMesh);
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
        if (frontDecalMeshRef.current) {
            while (frontDecalMeshRef.current.children.length) {
                frontDecalMeshRef.current.remove(
                    frontDecalMeshRef.current.children[0]
                );
            }
        }
        updateFrontElements();
    }, [frontElements]);

    // BACK SIDE ELEMENTS CONTROL
    const updateBackElements = () => {
        scene.traverse((child) => {
            if (
                child.isMesh &&
                child.name.includes("polySurface4_re_work_phong1__0")
            ) {
                backElements.forEach((element, index) => {
                    const texture =
                        element.type === "image"
                            ? element.texture
                            : createTextTexture(
                                  element.content,
                                  element.color,
                                  element.size
                              );

                    if (texture) {
                        // Ensure texture does not repeat
                        texture.repeat.set(1, 1); // Set texture to show only once
                        texture.transparent = true
                        const decalMaterial = new THREE.MeshBasicMaterial({
                            map: texture,
                            transparent: true,
                            depthTest: true,
                            depthWrite: true,
                            polygonOffset: true,
                            polygonOffsetFactor: -1,
                        });

                        const position = new THREE.Vector3(
                            element.position.x,
                            element.position.y,
                            element.position.z * 1
                        );

                        // Orientation must be correctly aligned to the surface normal
                        const orientation = new THREE.Euler(0, Math.PI, 0);

                        const size = new THREE.Vector3(
                            element.type === "text"
                                ? element.scale.x
                                : element.scale.x,
                            element.type === "text"
                                ? element.scale.y
                                : element.scale.y,
                            element.scale.z * 1
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
                        backDecalMeshRef.current.add(decalMesh);
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
        if (backDecalMeshRef.current) {
            while (backDecalMeshRef.current.children.length) {
                backDecalMeshRef.current.remove(
                    backDecalMeshRef.current.children[0]
                );
            }
        }
        updateBackElements();
    }, [backElements]);

    // CAMERA CONTROLLING
    useEffect(() => {
        if (cameras && cameras.length > 0) {
            const gltfCamera = cameras[0];
            camera.position.copy(gltfCamera.position);
            camera.rotation.copy(gltfCamera.rotation);
            camera.fov = gltfCamera.fov;
            camera.updateProjectionMatrix();
        }
    }, [cameras, camera]);
    useFrame(() => {
        if (positionChanged && targetPosition) {
            camera.position.lerp(targetPosition, 0.05);
            camera.lookAt(0, 0, 0);
            camera.updateProjectionMatrix();
        }
    });
    useEffect(() => {
        if (side) {
            setTargetPosition(cameraPositions[side] || camera.position.clone());
            setPositionChanged(true);
        }
    }, [side]);


    return (
        <>
                <primitive object={scene}>
                    <group ref={frontDecalMeshRef} />
                    <group ref={backDecalMeshRef} />
                    <group ref={leftDecalMeshRef} />
                    <group ref={rightDecalMeshRef} />
                </primitive>
        </>
    );
};

export default Model;
