from app.llm.openai_llm import llm

def extract_skills(parsed_resume: str):

    prompt = f"""
    Identify all technical skills from the resume.

    Resume:
    {parsed_resume}

    Return the skills as a comma-separated list.
    """

    response = llm.invoke(prompt)

    return response.content