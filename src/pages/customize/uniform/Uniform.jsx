"use strict";

import React, { useRef, useState } from "react";
import styled from "styled-components";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { saveAs } from "file-saver";
import ColorPicker from "../../../components/Customize2d/ColorPicker";
import TShirtPreview from "../../../components/Customize2d/TShirtPreview";
import UploadButton from "../../../components/Customize2d/UploadButton";
import ControlPanelWrapper from "../../../components/Customize2d/LogoControls";

const Container = styled.div`
    display: flex;
    gap: 2rem;
    justify-content: space-between;
    align-items: flex-start;
`;

const TextInput = styled.input`
    padding: 10px 20px;
    outline: none;
    border: 1px gray solid;
    background-color: #d8d8d8;
    color: #3c3c3c;
`;

const designs = {
    basic: {
        name:"basic",
        img:{
            body:{
                front:"/t-shirts/basic/body-front.png",
                back:"/t-shirts/basic/body-back.png"
            },
            tshirt:{
                front:"/t-shirts/basic/tshirt-front.png",
                back:"/t-shirts/basic/tshirt-back.png"
            }
        }
    },
    design_1: {
        name:"design_1",
        img:{
            body:{
                front:"/t-shirts/design_1/body-front.png",
                back:"/t-shirts/design_1/body-back.png"
            },
            tshirt:{
                front:"/t-shirts/design_1/tshirt-front.png",
                back:"/t-shirts/design_1/tshirt-back.png"
            }
        }
    },
    design_2: {
        name:"design_2",
        img:{
            body:{
                front:"/t-shirts/design_2/body-front.png",
                back:"/t-shirts/design_2/body-back.png"
            },
            tshirt:{
                front:"/t-shirts/design_2/tshirt-front.png",
                back:"/t-shirts/design_2/tshirt-back.png"
            }
        }
    },
    design_3: {
        name:"design_3",
        img:{
            body:{
                front:"/t-shirts/design_3/body-front.png",
                back:"/t-shirts/design_3/body-back.png"
            },
            tshirt:{
                front:"/t-shirts/design_3/tshirt-front.png",
                back:"/t-shirts/design_3/tshirt-back.png"
            }
        }
    },
    

}

const Uniform = () => {
    const [chosenColor, setChosenColor] = useState("white");
    const [logos, setLogos] = useState({ front: [], back: [] });
    const [texts, setTexts] = useState({ front: [], back: [] });
    const [textInputFront, setTextInputFront] = useState("");
    const [textInputBack, setTextInputBack] = useState("");
    const [chosenDesign, setChosenDesign] = useState(designs.basic)

    const frontRef = useRef(null);
    const backRef = useRef(null);

    const handleFileUpload = (e, side) => {
        const files = Array.from(e.target.files);
        const newLogos = files.map((file) => ({
            id: Date.now() + Math.random(),
            src: URL.createObjectURL(file),
            width: 100,
            position: { x: 0, y: 0 },
        }));
        setLogos((prevLogos) => ({
            ...prevLogos,
            [side]: [...prevLogos[side], ...newLogos],
        }));
    };

    const handleWidthChange = (e, side, index, isLogo = true) => {
        const newSize = parseInt(e.target.value, 10);
        if (isLogo) {
            setLogos((prevLogos) => {
                const updatedLogos = { ...prevLogos };
                updatedLogos[side][index].width = newSize;
                return updatedLogos;
            });
        } else {
            setTexts((prevTexts) => {
                const updatedTexts = { ...prevTexts };
                updatedTexts[side][index].fontSize = newSize;
                return updatedTexts;
            });
        }
    };

    const handleDelete = (side, index, isLogo = true) => {
        if (isLogo) {
            setLogos((prevLogos) => {
                const updatedLogos = { ...prevLogos };
                updatedLogos[side].splice(index, 1);
                return updatedLogos;
            });
        } else {
            setTexts((prevTexts) => {
                const updatedTexts = { ...prevTexts };
                updatedTexts[side].splice(index, 1);
                return updatedTexts;
            });
        }
    };

    const handleDrag = (e, side, index, isLogo = true) => {
        const updatePosition = (items, setItems) => {
            const updatedItems = [...items[side]];
            updatedItems[index].position = { x: e.clientX, y: e.clientY };
            setItems((prevItems) => ({ ...prevItems, [side]: updatedItems }));
        };

        if (isLogo) {
            updatePosition(logos, setLogos);
        } else {
            updatePosition(texts, setTexts);
        }
    };

    const handleAddText = (side) => {
        if (side === "front" && textInputFront.trim()) {
            const newText = {
                id: Date.now() + Math.random(),
                content: textInputFront,
                fontSize: 16,
                position: { x: 0, y: 0 },
            };
            setTexts((prevTexts) => ({
                ...prevTexts,
                [side]: [...prevTexts[side], newText],
            }));
            setTextInputFront("");
        }
        if (side === "back" && textInputBack.trim()) {
            const newText = {
                id: Date.now() + Math.random(),
                content: textInputBack,
                fontSize: 16,
                position: { x: 0, y: 0 },
            };
            setTexts((prevTexts) => ({
                ...prevTexts,
                [side]: [...prevTexts[side], newText],
            }));
            setTextInputBack("");
        }
    };

    const handleDownloadPDF = () => {
        const pdf = new jsPDF("p", "mm", "a4");

        const addImageToPdf = (ref, offsetX, offsetY) => {
            return new Promise((resolve) => {
                html2canvas(ref.current).then((canvas) => {
                    const imgData = canvas.toDataURL("image/png");
                    pdf.addImage(imgData, "PNG", offsetX, offsetY);
                    resolve();
                });
            });
        };

        const promises = [
            addImageToPdf(frontRef, 10, 10),
            addImageToPdf(backRef, 100, 10), // Adjust offsetY as needed
        ];

        Promise.all(promises).then(() => {
            pdf.save("tshirt_design.pdf");
        });
    };

    const handleDownloadPNG = () => {
        const combinedCanvas = document.createElement("canvas");
        const ctx = combinedCanvas.getContext("2d");
        const frontCanvas = document.createElement("canvas");
        const backCanvas = document.createElement("canvas");

        // Capture front canvas
        html2canvas(frontRef.current).then((canvas) => {
            frontCanvas.width = canvas.width;
            frontCanvas.height = canvas.height;
            frontCanvas.getContext("2d").drawImage(canvas, 0, 0);

            // Capture back canvas
            html2canvas(backRef.current).then((canvas) => {
                backCanvas.width = canvas.width;
                backCanvas.height = canvas.height;
                backCanvas.getContext("2d").drawImage(canvas, 10, 10);

                // Combine front and back canvases into one
                combinedCanvas.width = Math.max(
                    frontCanvas.width,
                    backCanvas.width
                );
                combinedCanvas.height = frontCanvas.height + backCanvas.height;
                ctx.drawImage(frontCanvas, 0, 0);
                ctx.drawImage(backCanvas, 0, frontCanvas.height);

                // Convert combined canvas to PNG image and save
                combinedCanvas.toBlob((blob) => {
                    saveAs(blob, "combined_design.png");
                });
            });
        });
    };

    return (
        <>
            <div className="wow animate__animated animate__fadeIn flex flex-col gap-3">
                <h1 className="text-center text-3xl font-bold">Customize Your Desired Uniform</h1>
                <div className="flex gap-2 bg-white p-6 rounded-xl shadow-lg border">
                    <div className="flex flex-col flex-[2]">
                        <span className="text-2xl font-bold">
                            Preview Design
                        </span>
                        <div className="flex">
                            <div className="flex-1">
                                <TShirtPreview
                                    chosenColor={chosenColor}
                                    side="front"
                                    logos={logos.front}
                                    texts={texts.front}
                                    onDrag={handleDrag}
                                    ref={frontRef}
                                    chosenDesign={chosenDesign}
                                />
                            </div>
                            <div className="flex-[2]">
                                <TShirtPreview
                                    chosenColor={chosenColor}
                                    side="back"
                                    logos={logos.back}
                                    texts={texts.back}
                                    onDrag={handleDrag}
                                    ref={backRef}
                                    chosenDesign={chosenDesign}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-start flex-[1]">
                        <h2></h2>
                        <div className="">
                            <h3>T-Shirt Color</h3>
                            <div className=""></div>
                        </div>
                        <div className="">
                            <h3>T-Shirt Color</h3>
                            <div className=""></div>
                        </div>
                        <div className="">
                            <h3>T-Shirt Color</h3>
                            <div className=""></div>
                        </div>
                        <div className="">
                            <h3>T-Shirt Color</h3>
                            <div className=""></div>
                        </div>
                        <div className="">
                            <h3>T-Shirt Color</h3>
                            <div className=""></div>
                        </div>
                    </div>
                </div>
            </div>
            <ColorPicker onSelectColor={setChosenColor} />
            <Container>
                <ControlPanelWrapper
                    side="front"
                    logos={logos.front}
                    texts={texts.front}
                    onWidthChange={handleWidthChange}
                    onDelete={handleDelete}
                />
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                    }}
                >
                    <UploadButton onUpload={handleFileUpload} side="front" />

                    <div style={{ marginTop: "1rem" }}>
                        <TextInput
                            type="text"
                            value={textInputFront}
                            onChange={(e) => setTextInputFront(e.target.value)}
                            placeholder="Enter text"
                        />
                        <button onClick={() => handleAddText("front")}>
                            Add Text
                        </button>
                    </div>
                </div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                    }}
                >
                    <UploadButton onUpload={handleFileUpload} side="back" />

                    <div style={{ marginTop: "1rem" }}>
                        <TextInput
                            type="text"
                            value={textInputBack}
                            onChange={(e) => setTextInputBack(e.target.value)}
                            placeholder="Enter text"
                        />
                        <button onClick={() => handleAddText("back")}>
                            Add Text
                        </button>
                    </div>
                </div>
                <ControlPanelWrapper
                    side="back"
                    logos={logos.back}
                    texts={texts.back}
                    onWidthChange={handleWidthChange}
                    onDelete={handleDelete}
                />
            </Container>
            <div style={{ textAlign: "center", marginTop: "1rem" }}>
                <button onClick={handleDownloadPDF}>Download as PDF</button>
                <button onClick={handleDownloadPNG}>Download as PNG</button>
            </div>
        </>
    );
};

export default Uniform;
