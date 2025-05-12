import * as React from 'react';

export const Spinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <style>
        {`
          .loader {
            border: 4px solid hsl(210 40% 98% / 0.3); /* Use foreground color with opacity */
            border-radius: 50%;
            border-top: 4px solid hsl(210 40% 98%); /* Full foreground color for spinning part */
            width: 32px;
            height: 32px;
            animation: spin 1s linear infinite;
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      <div className="loader"></div>
    </div>
  );
};

export default Spinner; 