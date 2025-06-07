import React, { useState, useEffect } from "react";
import {
  uploadFiles,
  getPredictions,
  generateReport,
} from "./hooks/ajax";
import ImagePanel from "./components/ImagePanel";
import ReportPanel from "./components/ReportPanel";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [isPredicting, setIsPredicting] = useState(false);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [error, setError] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [predictionsArr, setPredictionsArr] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reportsArr, setReportsArr] = useState([]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  const handleFileUpload = async (files) => {
    try {
      setIsUploading(true);
      setError(null);

      const { files: uploadedFiles } = await uploadFiles(files);
      const urls = [];
      const preds = [];
      const reps = [];

      for (const fileObj of uploadedFiles) {
        setIsPredicting(true);
        const predictionData = await getPredictions(fileObj.image_id);
        setIsPredicting(false);

        setIsGeneratingReport(true);
        const { report } = await generateReport(fileObj.image_id, predictionData?.predictions || []);
        setIsGeneratingReport(false);

        urls.push(`${import.meta.env.VITE_API_BASE_URL}/api/get-image/${fileObj.image_id}`);
        preds.push(predictionData);
        reps.push(report);
      }

      setImageUrls(urls);
      setPredictionsArr(preds);
      setReportsArr(reps);
      setCurrentIndex(0);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsUploading(false);
      setIsPredicting(false);
      setIsGeneratingReport(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 relative">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="absolute right-0 top-0 p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <svg
                className="w-6 h-6 text-yellow-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            )}
          </button>
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
            Dental X-ray Analysis
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Upload a DICOM or RVG file to analyze dental pathologies
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start justify-items-center">
          <ImagePanel
            isUploading={isUploading}
            isPredicting={isPredicting}
            imageUrl={imageUrls[currentIndex]}
            predictions={predictionsArr[currentIndex]}
            error={error}
            onUpload={handleFileUpload}
            imageUrls={imageUrls}
            currentIndex={currentIndex}
            onPrev={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
            onNext={() => setCurrentIndex(prev => Math.min(imageUrls.length - 1, prev + 1))}
          />
          <ReportPanel
            isUploading={isUploading}
            isPredicting={isPredicting}
            isGeneratingReport={isGeneratingReport}
            report={reportsArr[currentIndex]}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
