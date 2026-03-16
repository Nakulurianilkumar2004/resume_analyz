import { useState } from "react"
import UploadResume from "./components/UploadResume"
import JobInput from "./components/JobInput"
import ResultDashboard from "./components/ResultDashboard"

function App() {

  const [resumeId, setResumeId] = useState(null)
  const [result, setResult] = useState(null)

  return (

    <div className="min-h-screen flex flex-col items-center p-10">

      <h1 className="text-4xl font-bold mb-10">
        AI Resume Analyzer
      </h1>

      <UploadResume setResumeId={setResumeId} />

      {resumeId && (
        <JobInput
          resumeId={resumeId}
          setResult={setResult}
        />
      )}

      <ResultDashboard result={result} />

    </div>

  )

}

export default App