import React from 'react';
import ReactMarkdown from 'react-markdown';

const DiagnosticReport = ({ report }) => {
  return (
    <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6">
      <div className="prose dark:prose-invert max-w-none">
        <ReactMarkdown
          components={{
            h1: ({ node, ...props }) => <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white" {...props} />,
            h2: ({ node, ...props }) => <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100" {...props} />,
            h3: ({ node, ...props }) => <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100" {...props} />,
            p: ({ node, ...props }) => <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed" {...props} />,
            ul: ({ node, ...props }) => <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300" {...props} />,
            ol: ({ node, ...props }) => <ol className="list-decimal pl-6 mb-4 text-gray-700 dark:text-gray-300" {...props} />,
            li: ({ node, ...props }) => <li className="mb-2" {...props} />,
            strong: ({ node, ...props }) => <strong className="font-semibold text-gray-900 dark:text-white" {...props} />,
          }}
        >
          {report}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default DiagnosticReport; 