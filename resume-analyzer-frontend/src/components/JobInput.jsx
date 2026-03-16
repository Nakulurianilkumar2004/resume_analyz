import { useState } from "react"
import API from "../api"

function JobInput({ resumeId, setResult }) {

    const [jobDesc, setJobDesc] = useState("")
    const [loading, setLoading] = useState(false)

    const analyzeResume = async () => {

        if (!resumeId) {
            alert("Upload resume first")
            return
        }

        try {

            setLoading(true)

            const res = await API.post(
                `/analysis/analyze/${resumeId}?job_description=${jobDesc}`
            )

            setResult(res.data)

        } catch (err) {

            alert("Analysis error")

        }

        setLoading(false)

    }

    return (

        <div className="bg-white shadow-xl rounded-xl p-6 w-full max-w-xl mt-6">

            <h2 className="text-xl font-semibold mb-4">
                Job Description
            </h2>

            <textarea
                rows="4"
                value={jobDesc}
                onChange={(e) => setJobDesc(e.target.value)}
                placeholder="Enter job description..."
                className="w-full border rounded-lg p-3"
            />

            <button
                onClick={analyzeResume}
                className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
            >

                {loading ? "Analyzing..." : "Analyze Resume"}

            </button>

        </div>

    )

}

export default JobInput