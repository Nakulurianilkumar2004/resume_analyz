from pymongo import MongoClient
from app.config.settings import settings

client = MongoClient(settings.MONGO_URI)

db = client[settings.DATABASE_NAME]

resume_collection = db["resumes"]
analysis_collection = db["analysis"]