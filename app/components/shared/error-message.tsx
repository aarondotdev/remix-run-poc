import React from 'react';

interface Props {
  errors?: {
    [key: string]: string[];
  };
}

export const ErrorMessage: React.FC<Props> = ({ errors }) => {
  if (!errors || Object.keys(errors).length === 0) {
    return (
      <p className="error-message">
        An internal error occurred. Please contact support or try again later.
      </p>
    );
  }

  return (
    <div className="error-container">
      {Object.entries(errors).map(([field, messages], index) => (
        <p key={index} className="error-message">
          {messages?.join(', ') || 'An unknown error occurred.'}
        </p>
      ))}
    </div>
  );
};

export default ErrorMessage;
