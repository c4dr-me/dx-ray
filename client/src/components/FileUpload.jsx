import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import LoadingSpinner from './LoadingSpinner';

const FileUpload = ({ onUpload, loading }) => {
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      onUpload(acceptedFiles); 
    }
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/dicom': ['.dcm'],
      'image/x-rvg': ['.rvg']
    },
    multiple: true
  });

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive 
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
            : 'border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400'
          }`}
      >
        <input {...getInputProps()} />
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <LoadingSpinner />
          </div>
        ) : (
          <div>
            <p className="text-gray-600 dark:text-gray-400">
              {isDragActive
                ? "Drop the files here"
                : "Drag and drop DICOM files here, or click to select"}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
              Supported formats: .dcm, .rvg
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;