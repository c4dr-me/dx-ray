const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const handleResponse = async (response) => {
  if (!response.ok) throw new Error(`Request failed: ${response.statusText}`);
  return response.json();
};

export const uploadFiles = async (files) => {
  const formData = new FormData();
  files.forEach(file => formData.append('files', file));
  return handleResponse(await fetch(`${API_BASE_URL}/api/upload`, {
    method: 'POST',
    body: formData,
  }));
};

export const getPredictions = async (imageId) => {
  return handleResponse(await fetch(`${API_BASE_URL}/api/predict`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ image_id: imageId }),
  }));
};

export const generateReport = async (imageId, annotations) => {
  return handleResponse(await fetch(`${API_BASE_URL}/api/generate-report`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ image_id: imageId, annotations }),
  }));
}; 