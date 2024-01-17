import React, {useEffect, useState} from "react";

function App() {
    const [mrzData, setMRZData] = useState({});
    const [worker, setWorker] = useState(null);

    // console.log(mrzData);

    useEffect(() => {
        const initWorker = async () => {
            const blob = new Blob(
                [
                    window.mrz_worker
                        .toString()
                        .replace(/^function .+\{?|\}$/g, ""),
                ],
                {type: "text/javascript"}
            );

            const objectURL = URL.createObjectURL(blob);
            const workerInstance = new Worker(objectURL);

            workerInstance.onmessage = (e) => {
                const data = e.data;

                if (data.type === "result") {
                    // console.log(data.result.parsed.fields);
                    setMRZData(data.result.parsed.fields);
                } else if (data.type === "progress") {
                    console.error("PROGRESS");
                } else if (data.type === "error") {
                    console.error("Error:", data.error);
                }
            };

            setWorker(workerInstance);
        };

        if (!worker) {
            initWorker();
        }

        return () => {
            if (worker) {
                worker.terminate();
                setWorker(null);
            }
        };
    }, [worker, setMRZData, mrzData]);

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

    return (
        <div>
            <input type="file" id="photo" onChange={handleFileChange} />

            <div id="mrz-data">
                {Object.keys(mrzData).map((field) => (
                    <div key={field}>
                        {field} : {mrzData[field]}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
