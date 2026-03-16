from app.services.resume_parser import parse_resume
from app.services.skill_extractor import extract_skills
from app.services.job_matcher import job_match
from app.services.feedback_generator import generate_feedback


def parse_node(state):

    parsed = parse_resume(state["resume"])

    return {
        "parsed_resume": parsed
    }


def skill_node(state):

    skills = extract_skills(state["parsed_resume"])

    return {
        "skills": skills
    }


def match_node(state):

    match = job_match(
        state["skills"],
        state["job_description"]
    )

    return {
        "match_result": match
    }


def feedback_node(state):

    feedback = generate_feedback(state["resume"])

    return {
        "feedback": feedback
    }