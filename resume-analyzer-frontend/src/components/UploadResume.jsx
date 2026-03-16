```javascript
import { useState } from "react";
import API from "../api";

function UploadResume({ setResumeId }) {

    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];

        if (!selectedFile) return;

        if (selectedFile.type !== "application/pdf") {
            alert("Please upload a PDF file only.");
            return;
        }

        setFile(selectedFile);
    };

    const uploadResume = async () => {

        if (!file) {
            alert("Please upload a PDF file.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {

            setLoading(true);

            const res = await API.post("/resume/upload", formData);

            if (res.data?.resume_id) {
                setResumeId(res.data.resume_id);
                alert("Resume uploaded successfully!");
            } else {
                alert("Upload completed but no resume ID returned.");
            }

        } catch (err) {
            console.error("Upload error:", err);
            alert("Upload failed. Please check console.");
        } finally {
            setLoading(false);
        }
    };

    return (

        <div className="bg-white shadow-xl rounded-xl p-6 w-full max-w-xl">

            <h2 className="text-2xl font-semibold mb-4">
                Upload Resume
            </h2>

            <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="border p-2 rounded w-full"
            />

            <button
                onClick={uploadResume}
                disabled={loading}
                className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
            >
                {loading ? "Uploading..." : "Upload Resume"}
            </button>

        </div>

    );

}

export default UploadResume;
```
