import React from 'react';

interface ErrorMessageProps {
  title: string;
  message: string | Error;
  children?: React.ReactNode;
}

const ErrorMessageCard: React.FC<ErrorMessageProps> = ({
  title,
  message,
  children
}) => {
  return (
    <div className="flex flex-col items-center flex-1 h-full gap-4 p-6">
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 w-full max-w-md animate-fade-in">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-medium text-red-800">
              {title}
            </h3>
            <div className="mt-2 text-sm text-red-700">
              {typeof message === 'string' ? message : message.message}
            </div>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};

export default ErrorMessageCard; 