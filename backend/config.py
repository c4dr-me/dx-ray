import os
from dotenv import load_dotenv

load_dotenv()

def get_api_key(service_name: str) -> str:
    key = os.getenv(f"{service_name.upper()}_API_KEY")
    if not key:
        raise ValueError(f"{service_name.upper()}_API_KEY environment variable is not set")
    return key


MODEL_CONFIG = {
    "groq": {
        "model": "llama3-8b-8192",
        "temperature": 0.3,
        "max_tokens": 512,
        "top_p": 1,
        "frequency_penalty": 0,
        "presence_penalty": 0,
    }
}
