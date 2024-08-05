import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import Lights from "./Lights";
import Model from "./Model";
import Controls from "./Controls";

const Customize3d = () => {
    const [tShirtColor1, setTShirtColor1] = useState("#ffffff");
    const [tShirtColor2, setTShirtColor2] = useState("#ffffff");
    const [text, setText] = useState("");
    const [textColor, setTextColor] = useState("#000");
    const [elements, setElements] = useState([]);
    const [selectedElementIndex, setSelectedElementIndex] = useState(null);

    const handleAddText = () => {
        setElements((prev) => [
            ...prev,
            {
                type: "text",
                color: textColor,
                content: text,
                position: new THREE.Vector3(0, 1, 0),
                scale: new THREE.Vector3(1, 1, 1),
                size: 18,
            },
        ]);
        setText("");
    };

    const handleAddImage = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            const textureLoader = new THREE.TextureLoader();
            textureLoader.load(
                e.target.result,
                (texture) => {
                    if (texture) {
                        console.log("Texture Loaded:", texture);
                        texture.repeat.set(1, 1); // Set texture to show only once
                        setElements((prev) => [
                            ...prev,
                            {
                                type: "image",
                                texture,
                                position: new THREE.Vector3(0, 1, 0),
                                scale: new THREE.Vector3(1, 1, 1),
                            },
                        ]);
                    } else {
                        console.error("Failed to load texture.");
                    }
                },
                undefined,
                (error) => {
                    console.error("Error loading texture:", error);
                }
            );
        };
        reader.readAsDataURL(file);
    };

    const handleElementChange = (index, key, value) => {
        setElements((prev) =>
            prev.map((el, i) => (i === index ? { ...el, [key]: value } : el))
        );
    };

    const handleSelectElement = (index) => {
        setSelectedElementIndex(index);
    };

    const handleElementPositionChange = (index, position) => {
        handleElementChange(index, "position", position);
    };

    return (
        <div className="border border-gray-200 p-8 w-full rounded-md flex flex-col gap-4 bg-white shadow-md">
            <h1 className="text-2xl font-semibold">Customize your Uniform</h1>
            <div className="flex flex-col lg:flex-row w-full gap-10">
                <Canvas
                    shadows
                    className="border shadow-md w-full rounded-md flex-2"
                    style={{ height: "500px" }}
                >
                    <Lights />
                    <Model
                        tShirtColor1={tShirtColor1}
                        tShirtColor2={tShirtColor2}
                        elements={elements}
                        setElements={setElements}
                        onSelectElement={handleSelectElement}
                        onElementPositionChange={handleElementPositionChange}
                    />
                    <OrbitControls />
                </Canvas>
                <Controls
                    tShirtColor1={tShirtColor1}
                    setTShirtColor1={setTShirtColor1}
                    tShirtColor2={tShirtColor2}
                    setTShirtColor2={setTShirtColor2}
                    text={text}
                    setText={setText}
                    handleAddText={handleAddText}
                    handleAddImage={handleAddImage}
                    elements={elements}
                    setElements={setElements}
                    selectedElementIndex={selectedElementIndex}
                    setSelectedElementIndex={setSelectedElementIndex}
                    textColor={textColor}
                    setTextColor={setTextColor}
                />
            </div>
        </div>
    );
};

export default Customize3d;
