// components/ErrorComponent.js
import React from "react";

// ErrorComponent component to display error messages
const ErrorComponent = ({message}) => {
    return (
        <div style={{color: "red"}}>
            <p>An error occurred: {message}</p>
            <p>
                Please ensure the ID picture is clear and meets the required
                standards.
            </p>
        </div>
    );
};

export default ErrorComponent;
