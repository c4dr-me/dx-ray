from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from services.ai_service import AIService
from services.file_service import FileService
import os
import requests

router = APIRouter()
ai_service = AIService()
file_service = FileService()

class PredictRequest(BaseModel):
    image_id: str

@router.post("/predict")
async def predict(request: PredictRequest):
    try:
        image_path = os.path.join(file_service.upload_dir, f"{request.image_id}.png")
        if not os.path.exists(image_path):
            return JSONResponse(status_code=404, content={"error": "Image not found"})

        with open(image_path, "rb") as f:
            img_bytes = f.read()

        response = requests.post(
            f"{ai_service.roboflow_api_url}?api_key={ai_service.roboflow_api_key}",
            files={"file": img_bytes},
        )
        if response.status_code != 200:
            return JSONResponse(status_code=500, content={"error": "Roboflow API error", "details": response.text})

        return response.json()
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)}) 