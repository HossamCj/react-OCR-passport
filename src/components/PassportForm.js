// PassportForm.js
import React, {useState} from "react";
import Tesseract from "tesseract.js";
import {convertImageToBase64} from "./imageUtils"; // Adjust the path as needed

const PassportForm = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        dateOfBirth: "",
        placeOfBirth: "",
        nationality: "",
        sex: "",
        dateOfIssue: "",
        dateOfExpiry: "",
        profession: "",
        // Add more fields as needed
    });

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];

        if (!file) {
            console.error("No file selected.");
            return;
        }

        if (!file.type.startsWith("image/")) {
            console.error("Invalid file type. Please upload an image.");
            return;
        }

        try {
            // Convert the selected image to base64
            const base64Image = await convertImageToBase64(file);

            // Perform OCR using Tesseract.js
            const result = await Tesseract.recognize(base64Image, "eng", {
                logger: (info) => console.log(info),
            });

            // Extract information from the OCR results
            const extractedData = processOcrData(result.data.text);

            // Update the form data with the extracted information
            setFormData({
                ...formData,
                ...extractedData,
            });

            console.log("Extracted Data:", extractedData);
        } catch (error) {
            // Handle OCR errors
            handleOcrError(error);
        }
    };

    const processOcrData = (text) => {
        const extractedData = {
            fullName: extractValue(text, "Full name"),
            dateOfBirth: extractValue(text, "Date of Birth"),
            placeOfBirth: extractValue(text, "Place Of Birth"),
            nationality: extractValue(text, "Nationality"),
            sex: extractValue(text, "Sex"),
            dateOfIssue: extractValue(text, "Date of Issue"),
            dateOfExpiry: extractValue(text, "Date of Expiry"),
            profession: extractValue(text, "Profession"),
            // Add more fields as needed
        };

        return extractedData;
    };

    const extractValue = (text, fieldName) => {
        const regex = new RegExp(
            `${fieldName}[^\\S\\r\\n]*:[^\\S\\r\\n]*([^\r\n]+)`,
            "i"
        );
        const match = text.match(regex);
        return match ? match[1].trim() : "";
    };

    const handleOcrError = (error) => {
        // Handle different OCR error scenarios
        console.error("Tesseract.js OCR failed:", error);

        if (error.message.includes("loading tesseract core")) {
            console.error(
                "Tesseract.js core failed to load. Check the installation and browser compatibility."
            );
        } else if (error.message.includes("loading language traineddata")) {
            console.error(
                "Tesseract.js failed to load language traineddata. Check the language code and availability."
            );
        } else {
            console.error("Unexpected error:", error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Implement submission logic (e.g., send form data to a server)
        console.log("Form submitted:", formData);
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            {/* Your input fields here */}
            <div>
                <label>Full Name:</label>
                <input type="text" value={formData.fullName} readOnly />
            </div>

            <div>
                <label>Date of Birth:</label>
                <input type="text" value={formData.dateOfBirth} readOnly />
            </div>

            <div>
                <label>Place of Birth:</label>
                <input type="text" value={formData.placeOfBirth} readOnly />
            </div>

            <div>
                <label>Nationality:</label>
                <input type="text" value={formData.nationality} readOnly />
            </div>

            <div>
                <label>Sex:</label>
                <input type="text" value={formData.sex} readOnly />
            </div>

            <div>
                <label>Date of Issue:</label>
                <input type="text" value={formData.dateOfIssue} readOnly />
            </div>

            <div>
                <label>Date of Expiry:</label>
                <input type="text" value={formData.dateOfExpiry} readOnly />
            </div>

            <div>
                <label>Profession:</label>
                <input type="text" value={formData.profession} readOnly />
            </div>

            {/* Add more fields as needed */}

            <div>
                <label>
                    Upload ID Picture:
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                    />
                </label>
            </div>

            <br />

            <button type="submit">Submit</button>
        </form>
    );
};

export default PassportForm;
