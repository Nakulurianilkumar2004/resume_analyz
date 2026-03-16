from app.llm.openai_llm import llm

def generate_feedback(resume_text: str):

    prompt = f"""
    Analyze the resume and provide improvement suggestions.

    Resume:
    {resume_text}

    Provide:
    1. Overall feedback
    2. Missing skills
    3. Resume structure improvements
    4. Suggestions to improve ATS score
    """

    response = llm.invoke(prompt)

    return response.content