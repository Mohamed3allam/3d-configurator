import React from "react";
import styled from "styled-components";

const Controls = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 1rem;
`;

const ControlPanel = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 1rem;
`;

const LogoControls = ({ items, side, onWidthChange, onDelete, isLogo = true }) => {
    return items.map((item, index) => (
        <Controls key={item.id}>
            <input
                type="range"
                min="10"
                max="500"
                value={isLogo ? item.width : item.fontSize}
                onChange={(e) => onWidthChange(e, side, index, isLogo)}
                style={{ width: "150px", marginTop: "0.5rem" }}
            />
            <button onClick={() => onDelete(side, index, isLogo)}>Delete</button>
        </Controls>
    ));
};

const ControlPanelWrapper = ({ side, logos, texts, onWidthChange, onDelete }) => (
    <ControlPanel>
        <h3>{side.charAt(0).toUpperCase() + side.slice(1)} Logo Controls</h3>
        <LogoControls items={logos} side={side} onWidthChange={onWidthChange} onDelete={onDelete} />
        <h3>{side.charAt(0).toUpperCase() + side.slice(1)} Text Controls</h3>
        <LogoControls items={texts} side={side} onWidthChange={onWidthChange} onDelete={onDelete} isLogo={false} />
    </ControlPanel>
);

export default ControlPanelWrapper;
