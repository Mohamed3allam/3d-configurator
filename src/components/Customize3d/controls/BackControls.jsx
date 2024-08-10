import React, { useState } from "react";
import { css, styled } from "styled-components";
import * as THREE from "three";
import { Vector3 } from "three";
import SidewayChoice from "./SidewayChoice";
import { CSSTransition } from "react-transition-group";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DeleteIcon from "@mui/icons-material/Delete";

const Input = styled.input`
    border: 1px solid lightgray;
`;

const ArrowDownIcon = styled(KeyboardArrowDownIcon)`
    ${(props) =>
        props.active &&
        css`
            transform: rotate(180deg);
        `}

    transition: transform 300ms ease-in-out !important;
`;

const BackControls = ({ elements, setElements }) => {
    const [text, setText] = useState("");
    const [textColor, setTextColor] = useState("#000");

    const [sections, setSections] = useState([
        {
            id: 1,
            title: "Section 1",
            content: "This is the content of section 1",
        },

        {
            id: 2,
            title: "Section 2",
            content: "This is the content of section 2",
        },

        // Add more sections as needed
    ]);

    const [activeSectionId, setActiveSectionId] = useState(null);

    const toggleSection = (id) => {
        setActiveSectionId((prevActiveSectionId) => {
            if (prevActiveSectionId === id) {
                return null; // Close the section if it's already active
            } else {
                return id; // Open the section
            }
        });
    };

    const handleElementChange = (index, key, value) => {
        const newElements = [...elements];
        newElements[index][key] = value;
        setElements(newElements);
    };

    const handleAddText = (e) => {
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
                mirrorHorizontal: true, // Add these properties
                mirrorVertical: false,
            },
        ]);
        setText("");
        e.preventDefault();
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
        document.getElementById("image-input").value = "";
    };

    return (
        <div className=" flex flex-col gap-4 flex-1">
            <div>
                <form>
                    <label htmlFor="">
                        <input
                            type="text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                    </label>
                    <button type="submit" onClick={handleAddText}>
                        Add Text
                    </button>
                </form>
            </div>
            <div>
                Add Image
                <input
                    type="file"
                    id="image-input"
                    className="text-sm text-stone-500
                      file:mr-5 file:py-1 file:px-3 file:border-[1px]
                      file:text-xs file:font-medium
                      file:bg-stone-50 file:text-stone-700
                      hover:file:cursor-pointer hover:file:bg-blue-50
                      hover:file:text-blue-700"
                    onChange={handleAddImage}
                />
            </div>

            <div className="flex flex-col w-full gap-2">
                {elements &&
                    elements.map((element, index) => (
                        <div key={index}>
                            <div className="flex flex-row justify-center items-center gap-3">
                                <button
                                    className="bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded w-full flex flex-row justify-between"
                                    onClick={() => toggleSection(index)}
                                >
                                    <span>
                                        {element.type === "text"
                                            ? element.content
                                            : `Image ${index}`}
                                    </span>
                                    <div>
                                        <span>
                                            <ArrowDownIcon
                                                active={
                                                    activeSectionId === index
                                                }
                                            />
                                        </span>
                                    </div>
                                </button>
                                <span className="rounded-sm bg-red-700 p-1 hover:bg-red-900">
                                    <DeleteIcon
                                        className="text-white cursor-pointer"
                                        onClick={() =>
                                            setElements((prev) =>
                                                prev.filter(
                                                    (_, i) => i !== index
                                                )
                                            )
                                        }
                                    />
                                </span>
                            </div>

                            <div
                                className={`${
                                    activeSectionId === index
                                        ? "block"
                                        : "hidden"
                                } transition duration-300 ease-out`}
                            >
                                <div
                                    key={index}
                                    className="p-4 bg-gray-100 border border-gray-200 rounded flex flex-col gap-1"
                                >
                                    {element.type === "text" && (
                                        <>
                                            <label className="flex gap-3 items-center">
                                                <Input
                                                    type="text"
                                                    value={element.content}
                                                    className="w-full rounded-md px-2 py-1 outline-none"
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
                                    {/* X POSITION CONTROLS */}
                                    <label className="flex flex-col">
                                        <span>Position X</span>

                                        <input
                                            type="range"
                                            min="-0.2"
                                            max="0.2"
                                            step="0.001"
                                            value={element.position.x}
                                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                                            onChange={(e) =>
                                                handleElementChange(
                                                    index,
                                                    "position",
                                                    new THREE.Vector3(
                                                        parseFloat(
                                                            e.target.value
                                                        ),
                                                        elements[
                                                            index
                                                        ].position.y,
                                                        elements[
                                                            index
                                                        ].position.z
                                                    )
                                                )
                                            }
                                        />
                                    </label>
                                    {/* Y POSITION CONTROLS */}
                                    <label className="flex flex-col">
                                        <span>Position Y</span>
                                        <input
                                            type="range"
                                            min="-0.35"
                                            max="0.35"
                                            step="0.01"
                                            value={element.position.y}
                                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                                            onChange={(e) =>
                                                handleElementChange(
                                                    index,
                                                    "position",
                                                    new THREE.Vector3(
                                                        elements[
                                                            index
                                                        ].position.x,
                                                        parseFloat(
                                                            e.target.value
                                                        ),
                                                        elements[
                                                            index
                                                        ].position.z
                                                    )
                                                )
                                            }
                                        />
                                    </label>
                                    {/* SCALE CONTROLS */}
                                    <label className="flex flex-col">
                                        <span>Scale</span>
                                        <input
                                            type="range"
                                            min={
                                                element.type === "text"
                                                    ? "0.4"
                                                    : "0.05"
                                            }
                                            max={
                                                element.type === "text"
                                                    ? "1.5"
                                                    : "0.5"
                                            }
                                            step="0.01"
                                            value={element.scale.x}
                                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                                            onChange={(e) =>
                                                handleElementChange(
                                                    index,
                                                    "scale",
                                                    new THREE.Vector2(
                                                        parseFloat(
                                                            e.target.value
                                                        ),
                                                        parseFloat(
                                                            e.target.value
                                                        ),
                                                        parseFloat(
                                                            e.target.value
                                                        )
                                                    )
                                                )
                                            }
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default BackControls;
