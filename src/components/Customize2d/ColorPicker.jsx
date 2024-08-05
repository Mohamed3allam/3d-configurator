import React from "react";

const colors = {
    red: "red",
    blue: "blue",
    darkred: "darkred",
    darkblue: "darkblue",
    white: "white",
    black: "black",
    gray: "gray",
    darkgreen: "darkgreen",
    yellow: "yellow",
};

const ColorPicker = ({ onSelectColor }) => {
    return (
        <div style={{ display: "flex", justifyContent: "center", gap: "3rem" }}>
            {Object.keys(colors).map((color) => (
                <div
                    key={color}
                    style={{
                        width: "40px",
                        height: "40px",
                        background: colors[color],
                        borderRadius: "50%",
                        cursor: "pointer",
                    }}
                    onClick={() => onSelectColor(colors[color])}
                ></div>
            ))}
        </div>
    );
};

export default ColorPicker;
