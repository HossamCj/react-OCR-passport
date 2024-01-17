// FileInput.js
import React from "react";

// FileInput component to handle file input
const FileInput = ({onChange}) => {
    return (
        <input
            type="file"
            id="photo"
            onChange={(e) => {
                onChange(e);
            }}
        />
    );
};

export default FileInput;
