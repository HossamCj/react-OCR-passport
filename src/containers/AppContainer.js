// containers/AppContainer.js
import React, {useState} from "react";
import FileInput from "../components/FileInput";
import MRZDisplay from "../components/MRZDisplay";
import ErrorComponent from "../components/ErrorComponent";
import useMRZWorker from "../hooks/useMRZWorker";
import "./AppContainer.css"; // Import a CSS file for styles

// Function to format date from "901206" to "06/12/1990"
const formatDate = (dateString) => {
    if (!dateString) {
        return "";
    }

    if (dateString.length === 6) {
        const fullYear = `19${dateString.substring(0, 2)}`;
        const month = dateString.substring(2, 4);
        const day = dateString.substring(4, 6);
        return `${day}/${month}/${fullYear}`;
    } else {
        return dateString;
    }
};

const AppContainer = () => {
    const {mrzData, error, handleFileChange} = useMRZWorker();
    const [showForm, setShowForm] = useState(false);

    // Function to handle the display of the form
    const handleFormDisplay = () => {
        setShowForm(true);
    };

    // Function to render the form based on MRZ data
    const renderForm = () => {
        if (!showForm) {
            return null;
        }

        return (
            <form className="mrz-form">
                {Object.keys(mrzData).map((field) => (
                    <div key={field} className="form-row">
                        <label htmlFor={field} className="label">
                            {field}
                        </label>
                        <input
                            type="text"
                            id={field}
                            name={field}
                            value={
                                field.toLowerCase().includes("date")
                                    ? formatDate(mrzData[field] || "")
                                    : mrzData[field] || ""
                            }
                            readOnly
                            className="input"
                        />
                    </div>
                ))}
            </form>
        );
    };

    return (
        <div>
            {/* FileInput component */}
            <FileInput
                onChange={(e) => {
                    handleFileChange(e);
                    handleFormDisplay();
                }}
            />
            {error ? (
                // ErrorComponent component
                <ErrorComponent message={error} />
            ) : (
                <>
                    {/* Render the form */}
                    {renderForm()}
                </>
            )}
        </div>
    );
};

export default AppContainer;
