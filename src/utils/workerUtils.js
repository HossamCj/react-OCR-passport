// utils/workerUtils.js
// Function to initialize the MRZ worker
const initWorker = () => {
    const blob = new Blob(
        [window.mrz_worker.toString().replace(/^function .+\{?|\}$/g, "")],
        {type: "text/javascript"}
    );

    const objectURL = URL.createObjectURL(blob);
    const worker = new Worker(objectURL);

    return worker;
};

export default initWorker;
