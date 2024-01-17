// imageUtils.js

export const convertImageToBase64 = async (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onloadend = () => {
            resolve(reader.result.split(",")[1]); // Extract base64 data (remove data:image/jpeg;base64,)
        };

        reader.onerror = (error) => {
            reject(error);
        };

        reader.readAsDataURL(file);
    });
};
