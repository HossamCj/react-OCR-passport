// OcrSpaceForm.js
import React, {useState} from "react";
import axios from "axios";

const OcrSpaceForm = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        dateOfBirth: "",
        placeOfBirth: "",
        nationality: "",
        sex: "",
        dateOfIssue: "",
        dateOfExpiry: "",
        profession: "",
    });

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];

        if (!file) {
            console.error("No file selected.");
            return;
        }

        try {
            console.log("Uploading file...");
            const result = await processImage(file);

            if (
                result &&
                result.ParsedResults &&
                result.ParsedResults.length > 0
            ) {
                const extractedData = processOcrData(
                    result.ParsedResults[0].ParsedText
                );
                setFormData({
                    ...formData,
                    ...extractedData,
                });
                console.log("Extracted Data:", extractedData);
            } else {
                console.error("OCR.space API did not return valid results.");
            }
        } catch (error) {
            console.error("OCR.space API failed:", error);
        }
    };

    const processImage = async (file) => {
        const apiKey = "K85308386388957"; // Replace with your OCR.space API key
        const apiUrl = "https://api.ocr.space/parse/image";

        try {
            console.log("Sending request to OCR.space API...");
            const formData = new FormData();
            formData.append("apikey", apiKey);
            formData.append("file", file);

            const response = await axios.post(apiUrl, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            console.log("OCR.space API response:", response.data);

            return response.data;
        } catch (error) {
            console.error("OCR.space API failed:", error);
            throw error;
        }
    };

    const processOcrData = (text) => {
        console.log("Processing OCR data...");

        // Define regular expressions to match key-value pairs
        const keyRegex = /([^:]+):/g;
        const valueRegex = /:([^\\r\\n]+)/g;

        // Extract keys and values using regular expressions
        const keys = text.match(keyRegex) || [];
        const values = text.match(valueRegex) || [];

        // Create an object with extracted keys and values
        const extractedData = {};
        keys.forEach((key, index) => {
            // Remove ':' from the key and trim whitespaces
            const cleanedKey = key.replace(/:/g, "").trim();

            // Use cleaned key as the property name and assign the corresponding value
            extractedData[cleanedKey] = values[index].trim();
        });

        console.log("Extracted data:", extractedData);

        return extractedData;
    };

    const extractValue = (text, fieldName) => {
        console.log(`Extracting value for ${fieldName}...`);
        // Implement your logic to extract values based on field names
        // Use regular expressions or any other method based on the expected pattern
        // Example: const match = text.match(new RegExp(`${fieldName}:([^\\r\\n]+)`));
        // Return the extracted value or an empty string if not found
        return "";
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

export default OcrSpaceForm;
