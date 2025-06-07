import React from 'react';
import DiagnosticReport from './DiagnosticReport';
import LoadingSpinner from './LoadingSpinner';

const ReportPanel = ({ isUploading, isPredicting, isGeneratingReport, report }) => {
  return (
    <div className="w-full max-w-2xl min-h-[700px]">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Diagnostic Report</h2>
      {(isUploading || isPredicting || isGeneratingReport) ? (
        <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg h-[600px] flex items-center justify-center">
          <LoadingSpinner />
        </div>
      ) : report ? (
        <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg h-[600px] overflow-y-auto"> 
          <DiagnosticReport report={report} />
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center h-[600px] w-full bg-gray-200 dark:bg-gray-700 rounded-md">
          <svg className="w-16 h-16 text-gray-400 dark:text-gray-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-gray-500 dark:text-gray-400 text-lg">Report will appear here after analysis</p>
        </div>
      )}
    </div>
  );
};

export default ReportPanel; 