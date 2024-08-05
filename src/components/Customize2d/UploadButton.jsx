import React from "react";
import styled from "styled-components";

const Button = styled.label`
    display: inline-block;
    padding: 6px 12px;
    cursor: pointer;
    background-color: #007bff;
    color: white;
    border-radius: 4px;
    margin-top: 1rem;
`;

const UploadButton = ({ onUpload, side }) => {
    return (
        <Button>
            Upload Logo for {side.charAt(0).toUpperCase() + side.slice(1)}
            <input
                type="file"
                multiple
                onChange={(e) => onUpload(e, side)}
                style={{ display: "none" }}
            />
        </Button>
    );
};

export default UploadButton;
