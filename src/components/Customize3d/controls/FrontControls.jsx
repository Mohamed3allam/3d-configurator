import React, { useState } from "react";
import { styled } from "styled-components";
import * as THREE from "three";
import { Vector3 } from "three";
import SidewayChoice from "./SidewayChoice";

const Input = styled.input`
    border: 1px solid lightgray;
    border-radius: 10px;
`;

const FrontControls = ({ elements, setElements }) => {
    const [text, setText] = useState("");
    const [textColor, setTextColor] = useState("#000");

    const handleElementChange = (index, key, value) => {
        const newElements = [...elements];
        newElements[index][key] = value;
        setElements(newElements);
    };

    const handleAddText = () => {
        if (text.trim() === "") {
            return;
        }
        setElements((prev) => [
            ...prev,
            {
                type: "text",
                color: textColor,
                content: text.trim(),
                position: new THREE.Vector3(0, 0, 0),
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
                        texture.repeat.set(1, 1); // Set texture to show only once
                        setElements((prev) => [
                            ...prev,
                            {
                                type: "image",
                                texture,
                                position: new THREE.Vector3(0, 0, 0),
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

    return (
        <div className="flex flex-col gap-4 flex-1">
            <div>
                <label htmlFor="">
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <button onClick={handleAddText}>Add Text</button>
                </label>
            </div>
            <div>
                Add Image
                <input type="file" onChange={handleAddImage} />
            </div>
            {elements &&
                elements.map((element, index) => (
                    <div key={index}>
                        {element.type === "text" && (
                            <>
                                <label className="flex gap-3 items-center">
                                    Text
                                    <Input
                                        type="text"
                                        value={element.content}
                                        onChange={(e) =>
                                            handleElementChange(
                                                index,
                                                "content",
                                                e.target.value
                                            )
                                        }
                                    />
                                </label>
                                <label className="flex gap-3 items-center">
                                    Text Color
                                    <Input
                                        type="color"
                                        value={element.color}
                                        onChange={(e) =>
                                            handleElementChange(
                                                index,
                                                "color",
                                                e.target.value
                                            )
                                        }
                                    />
                                </label>
                            </>
                        )}
                        <label>
                            Position X
                            <input
                                type="range"
                                min="-5"
                                max="5"
                                step="0.01"
                                value={element.position.x}
                                onChange={(e) =>
                                    handleElementChange(
                                        index,
                                        "position",
                                        new THREE.Vector2(
                                            parseFloat(e.target.value),
                                            elements[index].position.y,
                                            elements[index].position.z
                                        )
                                    )
                                }
                            />
                        </label>
                        <label>
                            Position Y
                            <input
                                type="range"
                                min="-5"
                                max="5"
                                step="0.01"
                                value={element.position.y}
                                onChange={(e) =>
                                    handleElementChange(
                                        index,
                                        "position",
                                        new THREE.Vector2(
                                            elements[index].position.x,
                                            parseFloat(e.target.value),
                                            elements[index].position.z
                                        )
                                    )
                                }
                            />
                        </label>
                        <label>
                            Scale
                            <input
                                type="range"
                                min={element.type === "text" ? "0.05" : "0.05"}
                                max={element.type === "text" ? "0.5" : "0.5"}
                                step="0.01"
                                value={element.scale.x}
                                onChange={(e) =>
                                    handleElementChange(
                                        index,
                                        "scale",
                                        new THREE.Vector2(
                                            parseFloat(e.target.value),
                                            parseFloat(e.target.value),
                                            parseFloat(e.target.value)
                                        )
                                    )
                                }
                            />
                        </label>
                        <button
                            onClick={() =>
                                setElements((prev) =>
                                    prev.filter((_, i) => i !== index)
                                )
                            }
                        >
                            Delete
                        </button>
                    </div>
                ))}
        </div>
    );
};

export default FrontControls;
