import React, {useEffect} from "react";

function App() {
    let worker;

    useEffect(() => {
        worker = initWorker();

        return () => {
            worker.terminate();
        };
    }, []);

    const handleFileChange = (e) => {
        var reader = new FileReader();
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

            <div id="mrz-data"></div>
        </div>
    );
}

function initWorker() {
    const blob = new Blob(
        [window.mrz_worker.toString().replace(/^function .+\{?|\}$/g, "")],
        {type: "text/javascript"}
    );

    const objectURL = URL.createObjectURL(blob);

    const worker = new Worker(objectURL);

    worker.addEventListener("message", (e) => {
        const data = e.data;

        if (data.type === "result") {
            console.log(data.result.parsed.fields);

            if (data.result.parsed && data.result.parsed.valid) {
                const parsed = data.result.parsed.fields;
                const mrzDataElement = document.getElementById("mrz-data");

                if (parsed) {
                    mrzDataElement.innerHTML = Object.keys(parsed)
                        .map(
                            (field) => `<div>${field} : ${parsed[field]}</div>`
                        )
                        .join("");
                }
            }
        } else if (data.type === "progress") {
            console.error("PROGRESS");
        } else if (data.type === "error") {
            console.error("Error:", data.error);
        }
    });

    return worker;
}

export default App;
