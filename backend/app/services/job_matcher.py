# app/services/job_matcher.py
import json
import re

# ✅ Import your LLM object
from app.llm.openai_llm import llm  # adjust path if needed

def job_match(resume_skills, job_description):
    prompt = f"""
    Compare candidate skills with job description.

    Candidate Skills:
    {resume_skills}

    Job Description:
    {job_description}

    Return JSON only in this format:
    {{
        "match_score": number,
        "missing_skills": [],
        "strengths": ""
    }}
    """

    # Call your LLM
    response = llm.invoke(prompt)

    # Ensure response.content exists
    if not hasattr(response, "content") or not response.content:
        return {"match_score": 0, "missing_skills": [], "strengths": "No output from LLM"}

    text = response.content.strip()

    try:
        # Try parsing JSON directly
        result = json.loads(text)
    except json.JSONDecodeError:
        # Fallback: extract first {...} JSON block
        match = re.search(r"\{.*\}", text, re.DOTALL)
        if match:
            result = json.loads(match.group())
        else:
            # Return default if parsing fails
            result = {"match_score": 0, "missing_skills": [], "strengths": "Could not parse LLM output"}

    return result