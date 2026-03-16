from fastapi import APIRouter, UploadFile, File
import shutil
import uuid

from app.utils.pdf_loader import load_pdf
from app.database.mongodb import resume_collection

router = APIRouter()

@router.post("/upload")

async def upload_resume(file: UploadFile = File(...)):

    file_id = str(uuid.uuid4())

    path = f"uploads/{file_id}.pdf"

    with open(path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    resume_text = load_pdf(path)

    resume_collection.insert_one({
        "resume_id": file_id,
        "text": resume_text
    })

    return {"resume_id": file_id}