// hooks/useMRZWorker.js
import {useEffect, useState} from "react";
import initWorker from "../utils/workerUtils";

// Custom hook to handle MRZ worker functionality
const useMRZWorker = () => {
    const [mrzData, setMRZData] = useState({});
    const [worker, setWorker] = useState(null);

    // Effect to initialize and handle messages from the worker
    useEffect(() => {
        // Function to handle messages from the worker
        const handleWorkerMessage = (e) => {
            const data = e.data;

            if (data.type === "result") {
                setMRZData(data.result.parsed.fields);
            } else if (data.type === "progress") {
                console.error("PROGRESS");
            } else if (data.type === "error") {
                console.error("Error:", data.error);
            }
        };

        // Function to initialize the worker
        const initializeWorker = async () => {
            const workerInstance = initWorker();

            workerInstance.onmessage = handleWorkerMessage;
            setWorker(workerInstance);
        };

        // Initialize the worker if not already initialized
        if (!worker) {
            initializeWorker();
        }

        // Cleanup function to terminate the worker
        return () => {
            if (worker) {
                worker.terminate();
                setWorker(null);
            }
        };
    }, [worker, setMRZData, mrzData]);

    // Function to handle file change and post message to the worker
    const handleFileChange = (e) => {
        const reader = new FileReader();

        reader.onload = function (e) {
            worker.postMessage({
                cmd: "process",
                image: e.target.result,
            });
        };

        if (e.target.files.length) {
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    // Return MRZ data and file change handler
    return {mrzData, handleFileChange};
};

export default useMRZWorker;
