from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes.resume_routes import router as resume_router
from app.api.routes.analysis_routes import router as analysis_router

app = FastAPI(title="AI Resume Analyzer")


# Allowed frontend origins
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173"
]


# Add CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,   # Frontend URLs
    allow_credentials=True,
    allow_methods=["*"],     # Allow all HTTP methods
    allow_headers=["*"],     # Allow all headers
)


# Include routers
app.include_router(resume_router, prefix="/resume")
app.include_router(analysis_router, prefix="/analysis")


@app.get("/")
def root():
    return {"message": "AI Resume Analyzer Running"}