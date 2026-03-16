import { useState } from "react"
import API from "../api"

function UploadResume({ setResumeId }) {

    const [file, setFile] = useState(null)
    const [loading, setLoading] = useState(false)

    const uploadResume = async () => {

        if (!file) {
            alert("Upload PDF")
            return
        }

        const formData = new FormData()
        formData.append("file", file)

        try {

            setLoading(true)

            const res = await API.post("/resume/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })

            setResumeId(res.data.resume_id)

        } catch (err) {
            alert("Upload failed")
        }

        setLoading(false)

    }

    return (

        <div className="bg-white shadow-xl rounded-xl p-6 w-full max-w-xl">

            <h2 className="text-2xl font-semibold mb-4">
                Upload Resume
            </h2>

            <input
                type="file"
                accept=".pdf"
                onChange={(e) => setFile(e.target.files[0])}
                className="border p-2 rounded w-full"
            />

            <button
                onClick={uploadResume}
                className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >

                {loading ? "Uploading..." : "Upload Resume"}

            </button>

        </div>

    )

}

export default UploadResume