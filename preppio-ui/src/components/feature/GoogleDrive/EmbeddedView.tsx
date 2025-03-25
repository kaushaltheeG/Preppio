import React, { useState } from 'react';
import { CircularProgress } from '@mui/material';

interface IEmbeddedViewProps {
  url: string;
}

const EmbeddedView: React.FC<IEmbeddedViewProps> = ({ url }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="w-full h-full relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center flex-col bg-white/50">
          <CircularProgress />
          <span className="text-lg">Loading Your Google Document IFrame...</span>
        </div>
      )}
      <iframe
        title="Google Drive Document"
        src={url}
        width="100%"
        height="100%"
        style={{ border: 'none' }}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
};

export default EmbeddedView;
