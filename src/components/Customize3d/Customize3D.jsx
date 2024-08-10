import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import Lights from "./Lights";
import Model from "./Model";
import Controls from "./controls/Controls";

const Customize3d = () => {
    const [side, setSide] = useState("front");

    const [tShirtColor1, setTShirtColor1] = useState("#ffffff");
    const [tShirtColor2, setTShirtColor2] = useState("#ffffff");


    
    const [frontElements, setFrontElements] = useState([]);
    const [backElements, setBackElements] = useState([]);
    const [leftElements, setLeftElements] = useState([]);
    const [rightElements, setRightElements] = useState([]);

    

    // const handleElementChange = (index, key, value) => {
    //     setFrontElements((prev) =>
    //         prev.map((el, i) => (i === index ? { ...el, [key]: value } : el))
    //     );
    // };

    // const handleElementPositionChange = (index, position) => {
    //     handleElementChange(index, "position", position);
    // };

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

                        frontElements={frontElements}
                        setFrontElements={setFrontElements}

                        backElements={backElements}
                        setBackElements={setBackElements}

                        rightElements={rightElements}
                        setRightElements={setRightElements}

                        leftElements={leftElements}
                        setLeftElements={setLeftElements}

                        side={side}
                    />
                    <OrbitControls />
                </Canvas>
                <Controls
                    tShirtColor1={tShirtColor1}
                    setTShirtColor1={setTShirtColor1}
                    tShirtColor2={tShirtColor2}
                    setTShirtColor2={setTShirtColor2}

                    frontElements={frontElements}
                    setFrontElements={setFrontElements}

                    backElements={backElements}
                    setBackElements={setBackElements}

                    leftElements={leftElements}
                    setLeftElements={setLeftElements}

                    rightElements={rightElements}
                    setRightElements={setRightElements}

                    side={side}
                    setSide={setSide}
                />
                {/* <Controls
                    tShirtColor1={tShirtColor1}
                    setTShirtColor1={setTShirtColor1}
                    tShirtColor2={tShirtColor2}
                    setTShirtColor2={setTShirtColor2}
                    text={text}
                    setText={setText}
                    handleAddText={handleAddText}
                    handleAddImage={handleAddImage}
                    elements={elements}
                    setFrontElements={setFrontElements}
                    textColor={textColor}
                    setTextColor={setTextColor}
                /> */}
            </div>
        </div>
    );
};

export default Customize3d;
