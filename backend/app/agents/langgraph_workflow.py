from typing import TypedDict
from langgraph.graph import StateGraph, END
from app.agents.nodes import parse_node, skill_node, match_node, feedback_node


class ResumeState(TypedDict):
    resume: str
    job_description: str
    parsed_resume: str
    skills: str
    match_result: str
    feedback: str


def create_workflow():

    workflow = StateGraph(ResumeState)

    workflow.add_node("parser", parse_node)
    workflow.add_node("skills", skill_node)
    workflow.add_node("match", match_node)
    workflow.add_node("feedback", feedback_node)

    workflow.set_entry_point("parser")

    workflow.add_edge("parser", "skills")
    workflow.add_edge("skills", "match")
    workflow.add_edge("match", "feedback")
    workflow.add_edge("feedback", END)

    return workflow.compile()


resume_workflow = create_workflow()