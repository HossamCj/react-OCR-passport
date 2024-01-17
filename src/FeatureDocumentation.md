# Feature Documentation: MRZ Data Extraction and Form Display

## Overview

This documentation provides an overview of the MRZ (Machine Readable Zone) Data Extraction and Form Display feature. This feature allows users to upload an image of an identification document, extracts relevant information from the MRZ, and displays the data in a formatted form.

## Components

### 1. AppContainer

The `AppContainer` component serves as the main container for the feature. It integrates the following components:

-   **FileInput:** A component that allows users to upload an image.

-   **MRZDisplay:** Displays the extracted MRZ data.

-   **ErrorComponent:** Displays an error message if an issue occurs during the process.

### 2. FileInput Component

The `FileInput` component is responsible for handling file uploads. It triggers the MRZ data extraction process when an image is selected.

### 3. MRZDisplay Component

The `MRZDisplay` component receives the extracted MRZ data and renders it in a readable format on the user interface.

### 4. ErrorComponent Component

The `ErrorComponent` component handles and displays error messages if any issues occur during the process.

### 5. useMRZWorker Hook

The `useMRZWorker` custom hook manages the worker responsible for MRZ data extraction. It handles the communication between the main thread and the worker thread.

## Workflow

1. **File Upload:**

    - Users upload an image using the `FileInput` component.
    - The `handleFileChange` function is triggered.

2. **MRZ Data Extraction:**

    - The `useMRZWorker` hook initializes a worker thread (`initWorker`) for MRZ data extraction.
    - The worker processes the image and sends the extracted data back.

3. **Data Display:**

    - The extracted MRZ data is displayed in a readable format using the `MRZDisplay` component.

4. **Error Handling:**
    - If any errors occur during the process, the `ErrorComponent` displays an error message.

## Date Format Transformation

The extracted date fields are formatted to improve readability:

-   Original: "901206"
-   Transformed: "06/12/1990"

## Code Structure

-   **src/containers/AppContainer.js:** Main container integrating components.
-   **src/components/FileInput.js:** File upload component.
-   **src/components/MRZDisplay.js:** MRZ data display component.
-   **src/components/ErrorComponent.js:** Error display component.
-   **src/hooks/useMRZWorker.js:** Custom hook managing MRZ worker.

## Usage

To use this feature, integrate the `AppContainer` component into your application. Users can upload identification document images, and the extracted MRZ data will be displayed.

Feel free to customize the components and styles based on your application's design.
