function ResultDashboard({ result }) {
    if (!result) return null;

    // Convert match_score to percentage
    const matchPercentage = result.match_score
        ? Math.round(result.match_score * 100)
        : "N/A";

    // Join missing skills array or show "None"
    const missingSkills =
        result.missing_skills && result.missing_skills.length > 0
            ? result.missing_skills.join(", ")
            : "None";

    return (
        <div className="grid md:grid-cols-2 gap-6 mt-10 max-w-4xl w-full">

            {/* Match Score */}
            <div className="bg-white shadow-lg p-6 rounded-xl">
                <h3 className="text-lg font-semibold mb-2">Match Score</h3>
                <p className="text-4xl text-green-600">{matchPercentage}%</p>

                {/* Optional: progress bar */}
                <div className="w-full bg-gray-200 h-3 rounded-full mt-2">
                    <div
                        className={`h-3 rounded-full ${matchPercentage >= 80
                                ? "bg-green-500"
                                : matchPercentage >= 50
                                    ? "bg-yellow-400"
                                    : "bg-red-500"
                            }`}
                        style={{ width: `${matchPercentage}%` }}
                    />
                </div>
            </div>

            {/* Missing Skills */}
            <div className="bg-white shadow-lg p-6 rounded-xl">
                <h3 className="text-lg font-semibold mb-2">Missing Skills</h3>
                <p>{missingSkills}</p>
            </div>

            {/* Strengths */}
            <div className="bg-white shadow-lg p-6 rounded-xl col-span-2">
                <h3 className="text-lg font-semibold mb-2">Strengths</h3>
                <p>{result.strengths || "N/A"}</p>
            </div>

            {/* Resume Feedback */}
            <div className="bg-white shadow-lg p-6 rounded-xl col-span-2">
                <h3 className="text-lg font-semibold mb-2">Resume Feedback</h3>
                <div
                    className="whitespace-pre-line"
                    dangerouslySetInnerHTML={{
                        __html: result.feedback ? result.feedback.replace(/\n/g, "<br />") : "N/A",
                    }}
                />
            </div>

        </div>
    );
}

export default ResultDashboard;