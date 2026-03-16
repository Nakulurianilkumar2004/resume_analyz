from fastapi import APIRouter
from app.database.mongodb import resume_collection
from app.agents.langgraph_workflow import resume_workflow

router = APIRouter()

@router.post("/analyze/{resume_id}")
def analyze_resume(resume_id: str, job_description: str):

    resume = resume_collection.find_one({"resume_id": resume_id})

    if not resume:
        return {"error": "Resume not found"}

    result = resume_workflow.invoke(
        {
            "resume": resume["text"],
            "job_description": job_description
        }
    )

    return {
        "match_score": result["match_result"]["match_score"],
        "missing_skills": result["match_result"]["missing_skills"],
        "strengths": result["match_result"]["strengths"],
        "feedback": result["feedback"]
    }