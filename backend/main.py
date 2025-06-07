from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from dotenv import load_dotenv
import os
from routes.upload import router as upload_router
from routes.get_image import router as get_image_router
from routes.predict import router as predict_router
from routes.generate_report import router as generate_report_router

load_dotenv()

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

app = FastAPI()

ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=False,
    allow_methods=["GET", "POST",],
    allow_headers=["Content-Type", "Accept", "Authorization"],
)

@app.options("/{full_path:path}")
async def options_handler():
    return {"message": "OK"}

app.include_router(upload_router, prefix="/api")
app.include_router(get_image_router, prefix="/api")
app.include_router(predict_router, prefix="/api")
app.include_router(generate_report_router, prefix="/api")

@app.get("/")
def read_root():
    return {"message": "Dobbe AI Backend is running 🚀"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True, log_level="info")
