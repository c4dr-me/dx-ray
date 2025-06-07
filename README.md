## Setup

### Docker Setup 

1. Ensure Docker Desktop is installed and running

2. Create a `.env` file in the root directory:
   ```
   ROBOFLOW_API_KEY=
   GROQ_API_KEY=
   ROBOFLOW_API_URL=https://detect.roboflow.com/adr/6
   ALLOWED_ORIGINS=http://localhost:5173
   VITE_API_BASE_URL=http://localhost:8000
   ```

3. Build and start the containers:
   ```bash
   docker-compose up -d
   ```

4. Access the application:
   - Frontend: http://localhost:5173
   - Backend: http://localhost:8000

5. View logs:
   ```bash
   docker logs fsa-backend-1
   docker logs fsa-frontend-1
   ```

6. Stop containers:
   ```bash
   docker-compose down
   ```

### Manual Setup

#### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Create a `.env` file in the backend directory with your API keys:
   ```
   ROBOFLOW_API_KEY=
   GROQ_API_KEY=
   ROBOFLOW_API_URL=https://detect.roboflow.com/adr/6
   ALLOWED_ORIGINS=
   ```

5. Start the backend server:
   ```bash
   python main.py
   ```

#### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
4. Create env file
   ```bash
   VITE_API_BASE_URL=http://localhost:8000
   ```   

The application will be available at `http://localhost:5173`


## API Endpoints

All endpoints are prefixed with `/api`

### File Upload and Management
- `POST /upload`
  - Response: `{"files": [{"image_id": "string", "filename": "string"}]}`

### Image Retrieval
- `GET /get-image/{image_id}`

### AI Analysis
- `POST /predict`
  - Request body: `{"image_id": "string"}`

### Report Generation
- `POST /generate-report`
  - Request body: `{"image_id": "string", "annotations": []}`
  - Response: `{"report": "string"}`

### Health Check
- `GET /`
  - Response: `{"message": "Dobbe AI Backend is running 🚀"}`

## Running Tests


### Using Python Directly
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Activate virtual environment:
   ```bash
   venv\Scripts\activate
   ```

3. Run tests:
   ```bash
   pytest tests/test_main.py -v
   ```





