import React from 'react';
import FileUpload from './FileUpload';
import AnnotatedImage from './AnnotatedImage';
import LoadingSkeleton from './LoadingSkeleton';

const ImagePanel = ({ isUploading, isPredicting, imageUrl, predictions, error, onUpload, imageUrls, currentIndex, onPrev, onNext }) => {
  return (
    <div className="w-full max-w-2xl min-h-[700px]">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Image Analysis</h2>
      <FileUpload onUpload={onUpload} loading={isUploading} />
      {error && (
        <div className="mt-8 p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-lg">
          {error}
        </div>
      )}
      {(isUploading || isPredicting || imageUrl) ? (
        <div className="mt-8">
          {imageUrls.length > 1 && (
            <div className="flex items-center justify-center mb-4 space-x-4">
              <button
                onClick={onPrev}
                disabled={currentIndex === 0}
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50"
                aria-label="Previous image"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <span className="text-gray-700 dark:text-gray-200">
                {currentIndex + 1} / {imageUrls.length}
              </span>
              <button
                onClick={onNext}
                disabled={currentIndex === imageUrls.length - 1}
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50"
                aria-label="Next image"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
          <div className="flex justify-center items-center w-full h-[450px] bg-gray-200 dark:bg-gray-700 rounded-md">
            {(isUploading || isPredicting) ? (
              <LoadingSkeleton />
            ) : (
              imageUrl && <AnnotatedImage imageUrl={imageUrl} predictions={predictions} className="p-5" />
            )}
          </div>
        </div>
      ) : (
        <div className="mt-8 flex flex-col justify-center items-center w-full h-[450px] bg-gray-200 dark:bg-gray-700 rounded-md">
          <svg className="w-16 h-16 text-gray-400 dark:text-gray-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-gray-500 dark:text-gray-400 text-lg">Upload an image to begin analysis</p>
        </div>
      )}
    </div>
  );
};

export default ImagePanel; 