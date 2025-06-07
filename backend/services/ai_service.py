import requests
from typing import List, Dict, Any
from groq import Groq
from config import get_api_key, MODEL_CONFIG
from dotenv import load_dotenv
import os

load_dotenv()

class AIService:
    def __init__(self):
        self.groq_client = Groq(api_key=get_api_key("groq"))
        self.roboflow_api_key = get_api_key("roboflow")
        self.roboflow_api_url = os.getenv("ROBOFLOW_API_URL")

    def detect_pathologies(self, image_path: str) -> Dict[str, Any]:
        with open(image_path, "rb") as f:
            img_bytes = f.read()

        url = f"{self.roboflow_api_url}?api_key={self.roboflow_api_key}&confidence=0.3&overlap=0.5"
        response = requests.post(
            url,
            files={"file": img_bytes},
            timeout=30
        )

        if response.status_code != 200:
            raise RuntimeError(f"Roboflow error {response.status_code}: {response.text}")

        return response.json()

    def generate_report(self, predictions: List[Dict[str, Any]]) -> str:
        if not predictions:
            return "No pathologies detected."

        pathologies = "\n".join([
            f"- {pred['class']} (Confidence: {pred['confidence']:.2%})"
            for pred in predictions
        ])

        prompt = f"""You are a dental radiologist. Analyze the following pathologies:
{pathologies}

Provide a report with:
1. Summary
2. Detailed Analysis
3. Recommendations
4. Treatment"""

        response = self.groq_client.chat.completions.create(
            model=MODEL_CONFIG["groq"]["model"],
            messages=[{"role": "user", "content": prompt}],
            temperature=MODEL_CONFIG["groq"]["temperature"],
            max_tokens=MODEL_CONFIG["groq"]["max_tokens"]
        )
        return response.choices[0].message.content
