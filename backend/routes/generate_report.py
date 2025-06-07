from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from services.ai_service import AIService

router = APIRouter()
ai_service = AIService()

class ReportRequest(BaseModel):
    image_id: str
    annotations: list

@router.post("/generate-report")
async def generate_report(request: ReportRequest):
    annotations = request.annotations
    if not annotations:
        return {"report": "No pathologies detected in the image."}

    try:
        report = ai_service.generate_report(annotations)
        return {"report": report}
    except Exception as e:
        print("Groq API error:", e)
        raise HTTPException(status_code=500, detail=f"Groq API error: {e}") 