// MRZDisplay.js
import React from "react";

// MRZDisplay component to display MRZ data
const MRZDisplay = ({mrzData}) => {
    return (
        <div id="mrz-data">
            {Object.keys(mrzData).map((field) => (
                <div key={field}>
                    {field} : {mrzData[field]}
                </div>
            ))}
        </div>
    );
};

export default MRZDisplay;
