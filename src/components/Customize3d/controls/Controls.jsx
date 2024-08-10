import React, { useState } from "react";
import SidewayChoice from "./SidewayChoice";
import FrontControls from "./FrontControls";
import { styled } from "styled-components";
import BackControls from "./BackControls";

const Input = styled.input`
    border: 1px solid lightgray;
    border-radius: 10px;
`;

const Controls = ({
    tShirtColor1,
    setTShirtColor1,

    tShirtColor2,
    setTShirtColor2,


    frontElements,
    setFrontElements,

    backElements,
    setBackElements,

    rightElements,
    setRightElements,

    leftElements,
    setLeftElements,

    side,
    setSide,
}) => {

    



    return (
        <>
            <div className="flex flex-col">
                {/* TSHIRT COLOR CONTROL WHICH IS GENERAL NO NEED TO DIVIDE INTO PARTS */}
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

            {/* BASED ON THE SIDE CHOICE THE CONTROLS SHOW */}
            <SidewayChoice side={side} setSide={setSide}>
                {side === "front" ? (
                    <FrontControls
                        elements={frontElements}
                        setElements={setFrontElements}
                    />
                ) : side === "back" ? (
                    <BackControls
                        elements={backElements}
                        setElements={setBackElements}
                    />
                ) : side === "right" ? (
                    <div>"right"</div>
                ) : (
                    side === "left" && <div>"left"</div>
                )}
            </SidewayChoice>
        </>
    );
};

export default Controls;
