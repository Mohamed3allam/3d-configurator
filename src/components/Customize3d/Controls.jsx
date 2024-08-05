import React from "react";
import { styled } from "styled-components";
import * as THREE from "three";
import { Vector3 } from "three";

const Input = styled.input`
    border: 1px solid lightgray;
    border-radius: 10px;
`;

const Controls = ({
    tShirtColor1,
    setTShirtColor1,
    tShirtColor2,
    setTShirtColor2,
    text,
    setText,
    handleAddText,
    handleAddImage,
    elements,
    setElements,
    textColor,
    setTextColor,
}) => {
    const handleElementChange = (index, key, value) => {
        const newElements = [...elements];
        newElements[index][key] = value;
        setElements(newElements);
    };

    return (
        <div className="flex flex-col gap-4 flex-1">
            <div className="flex flex-col justify-center">
                <h1 className="text-2xl font-semibold">T-Shirt Colors</h1>
                <div className="flex gap-3">
                    <div>
                        <label className="flex gap-3 items-center">
                            Color 1
                            <Input
                                type="color"
                                value={tShirtColor1}
                                onChange={(e) =>
                                    setTShirtColor1(e.target.value)
                                }
                            />
                        </label>
                    </div>
                    <div>
                        <label className="flex gap-3 items-center">
                            Color 2
                            <Input
                                type="color"
                                value={tShirtColor2}
                                onChange={(e) =>
                                    setTShirtColor2(e.target.value)
                                }
                            />
                        </label>
                    </div>
                </div>
            </div>
            <div>
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <button onClick={handleAddText}>Add Text</button>
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
                                min="-10"
                                max="10"
                                step="0.5"
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
                                min="0"
                                max="20"
                                step="0.5"
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
                                min={element.type === "text" ? "0.2" : "0"}
                                max={element.type === "text" ? "2" : "5"}
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

export default Controls;
