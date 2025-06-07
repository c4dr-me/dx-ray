from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
from services.file_service import FileService
from typing import List
import os

router = APIRouter()
file_service = FileService()

@router.post("/upload")
async def upload_files(files: List[UploadFile] = File(...)):
    results = []
    try:
        for file in files:
            file_content = await file.read()
            file_id = await file_service.save_upload_file(file_content, file.filename)
            result = await file_service.convert_dicom_to_image(file_id)
            if not result:
                raise HTTPException(status_code=500, detail=f"Failed to convert DICOM to image for {file.filename}")
            results.append({"image_id": file_id, "filename": file.filename})
        return {"files": results}
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})