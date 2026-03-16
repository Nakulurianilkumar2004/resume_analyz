from langchain_community.document_loaders import PyPDFLoader

def load_pdf(file_path):
    loader = PyPDFLoader(file_path)
    pages = loader.load()

    text = ""
    for page in pages:
        text += page.page_content

    return text