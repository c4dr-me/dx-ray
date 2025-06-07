from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse, JSONResponse
from services.file_service import FileService
import os

router = APIRouter()
file_service = FileService()

@router.get("/get-image/{image_id}")
def get_image(image_id: str):
    image_path = os.path.join(file_service.upload_dir, f"{image_id}.png")
    if not os.path.exists(image_path):
        return JSONResponse(status_code=404, content={"error": "Image not found"})
    return FileResponse(image_path, media_type="image/png") 