import os
import uuid
import pydicom
import cv2
from PIL import Image
from fastapi import UploadFile
from dotenv import load_dotenv
from typing import Optional
import numpy as np
import aiofiles

load_dotenv()

class FileService:
    def __init__(self):
        self.upload_dir = "uploads"
        os.makedirs(self.upload_dir, exist_ok=True)

    async def save_upload_file(self, file_content: bytes, filename: str) -> str:
        """Save uploaded file and return file_id"""
        try:
            file_id = str(uuid.uuid4())
            file_path = os.path.join(self.upload_dir, f"{file_id}.dcm")
            
            async with aiofiles.open(file_path, "wb") as f:
                await f.write(file_content)
                
            return file_id
        except Exception as e:
            raise RuntimeError(f"Failed to save uploaded file: {str(e)}")

    async def convert_dicom_to_image(self, file_id: str) -> Optional[str]:
        """Convert DICOM file to PNG image"""
        try:
            dicom_path = os.path.join(self.upload_dir, f"{file_id}.dcm")
            if not os.path.exists(dicom_path):
                return None

            ds = pydicom.dcmread(dicom_path)
            arr = ds.pixel_array
            arr = (arr - arr.min()) / (arr.max() - arr.min()) * 255
            arr = arr.astype(np.uint8)
            img = Image.fromarray(arr)
            
            png_path = os.path.join(self.upload_dir, f"{file_id}.png")
            img.save(png_path)
            
            return file_id
        except Exception as e:
            print(f"Error converting DICOM to image: {e}")
            return None

    def draw_bounding_boxes(self, image_path: str, predictions: list) -> str:
        """Draw bounding boxes on the image and return the path."""
        try:
            image = cv2.imread(image_path)

            for pred in predictions:
                x = int(pred["x"])
                y = int(pred["y"])
                w = int(pred["width"])
                h = int(pred["height"])
                label = f"{pred['class']} ({pred['confidence']:.0%})"

                cv2.rectangle(image, (x, y), (x + w, y + h), (0, 255, 0), 2)
                cv2.putText(image, label, (x, y - 10),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 0, 0), 1)

            annotated_path = image_path.replace(".png", "_annotated.png")
            cv2.imwrite(annotated_path, image)

            return annotated_path
        except Exception as e:
            raise RuntimeError(f"Failed to draw bounding boxes: {str(e)}")
