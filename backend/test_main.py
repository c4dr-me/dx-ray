import pytest
from fastapi.testclient import TestClient
from main import app
import os

client = TestClient(app)

def test_health_check():
    """Test the health check endpoint"""
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Dobbe AI Backend is running 🚀"}

def upload_test_file():
    test_image_path = "uploads/test.dcm"  
    with open(test_image_path, "rb") as f:
        files = {"files": ("test.dcm", f, "application/dicom")}
        response = client.post("/api/upload", files=files)
        assert response.status_code == 200
        data = response.json()
        assert "files" in data
        assert len(data["files"]) == 1
        return data["files"][0]["image_id"]

def test_upload():
    test_image_path = "uploads/test.dcm"  
    with open(test_image_path, "rb") as f:
        files = {"files": ("test.dcm", f, "application/dicom")}
        response = client.post("/api/upload", files=files)
        assert response.status_code == 200
        data = response.json()
        assert "files" in data
        assert len(data["files"]) == 1
        assert "image_id" in data["files"][0]
        assert "filename" in data["files"][0]

def test_get_image():
    image_id = upload_test_file()
    response = client.get(f"/api/get-image/{image_id}")
    assert response.status_code == 200
    assert response.headers["content-type"] == "image/png"

def test_predict():
    image_id = upload_test_file()
    response = client.post("/api/predict", json={"image_id": image_id})
    assert response.status_code == 200
    assert "predictions" in response.json()

def test_generate_report():
    image_id = upload_test_file()
    response = client.post("/api/generate-report", 
                          json={"image_id": image_id, "annotations": []})
    assert response.status_code == 200
    assert "report" in response.json()

def test_invalid_endpoints():
    """Test invalid requests to endpoints"""
    response = client.post("/api/upload")
    assert response.status_code == 422  

    response = client.get("/api/get-image/nonexistent")
    assert response.status_code == 404
    
    response = client.post("/api/predict", json={"image_id": "nonexistent"})
    assert response.status_code == 404
    
    response = client.post("/api/generate-report", 
                         json={"image_id": "nonexistent", "annotations": []})
    assert response.status_code == 200
    assert response.json()["report"] == "No pathologies detected in the image." 
