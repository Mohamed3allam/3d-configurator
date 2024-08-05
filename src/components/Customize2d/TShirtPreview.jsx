import React, { forwardRef, useRef } from "react";
import styled from "styled-components";

const Preview = styled.div`
    position: relative;
`;

const Image = styled.img`
    background: ${({ chosenColor }) => chosenColor && chosenColor};
    transition: all 0.3s ease-in-out;
    overflow: hidden;
`;

const DraggableItem = styled.div`
    position: absolute;
    cursor: move;
    user-select: none;
    top: ${({ position }) => position.y}px;
    left: ${({ position }) => position.x}px;
    width: ${({ width }) => width || "auto"}px;
    font-size: ${({ fontSize }) => fontSize || "auto"}px;
`;

const TShirtPreview = forwardRef(
    ({ chosenColor, side, logos, texts, onDrag, chosenDesign }, ref) => {
        const handleMouseDown = (e, item, index, isLogo = true) => {
            e.preventDefault();

            const startX = e.clientX;
            const startY = e.clientY;
            const startPos = item.position;

            const handleMouseMove = (moveEvent) => {
                const newX = startPos.x + (moveEvent.clientX - startX);
                const newY = startPos.y + (moveEvent.clientY - startY);
                onDrag({ clientX: newX, clientY: newY }, side, index, isLogo);
            };

            const handleMouseUp = () => {
                document.removeEventListener("mousemove", handleMouseMove);
                document.removeEventListener("mouseup", handleMouseUp);
            };

            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", handleMouseUp);
        };

        return (
            <Preview ref={ref}>
                <div>
                    <Image
                        chosenColor={chosenColor}
                        src={
                            side === "front"
                                ? chosenDesign.img.body.front
                                : chosenDesign.img.body.back
                        }
                        alt=""
                        width={300}
                    />
                </div>
                <div style={{ position: "absolute", top: 0 }}>
                    <Image
                        src={
                            side === "front"
                                ? chosenDesign.img.tshirt.front
                                : chosenDesign.img.tshirt.back
                        }
                        alt=""
                        width={300}
                    />
                </div>
                {logos.map((logo, index) => (
                    <DraggableItem
                        key={logo.id}
                        position={logo.position}
                        width={logo.width}
                        onMouseDown={(e) => handleMouseDown(e, logo, index)}
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <img
                            src={logo.src}
                            alt="logo"
                            style={{ width: "100%", objectFit: "cover" }}
                        />
                    </DraggableItem>
                ))}
                {texts.map((text, index) => (
                    <DraggableItem
                        key={text.id}
                        position={text.position}
                        fontSize={text.fontSize}
                        onMouseDown={(e) =>
                            handleMouseDown(e, text, index, false)
                        }
                    >
                        {text.content}
                    </DraggableItem>
                ))}
            </Preview>
        );
    }
);

export default TShirtPreview;
