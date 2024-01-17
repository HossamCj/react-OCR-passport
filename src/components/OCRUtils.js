// OCRUtils.js
import axios from "axios";

const OCR_API_KEY = "K85308386388957"; // Replace with your OCR.space API key

const performOCR = async (imageFile) => {
    try {
        const formData = new FormData();
        formData.append("apikey", OCR_API_KEY);
        formData.append("file", imageFile);

        const response = await axios.post(
            "https://api.ocr.space/parse/image",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error("OCR failed:", error);
        throw error;
    }
};

export default performOCR;
