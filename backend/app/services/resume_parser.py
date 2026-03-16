from app.llm.openai_llm import llm

def parse_resume(resume_text):

    prompt = f"""
    Extract the following from the resume.

    Name
    Skills
    Experience
    Education
    Projects

    Resume:
    {resume_text}
    """

    response = llm.invoke(prompt)

    return response.content