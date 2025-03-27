import React, { useState } from 'react';
import { CircularProgress } from '@mui/material';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { isCreatingGoogleDriveDocumentSelector } from '../../../store/slices/googleDriveSlice';
interface IEmbeddedViewProps {
  url: string;
}

const EmbeddedView: React.FC<IEmbeddedViewProps> = ({ url }) => {
  const [isLoading, setIsLoading] = useState(true);
  const isCreatingGoogleDriveDocument = useAppSelector(isCreatingGoogleDriveDocumentSelector);

  const loadingText = React.useMemo(() => {
    if (isCreatingGoogleDriveDocument) {
      return 'Creating Your Google Document...';
    }
    if (isLoading) {
      return 'Loading Your Google Document IFrame...';
    }
    return '';
  },[isCreatingGoogleDriveDocument, isLoading]);


  return (
    <div className="w-full h-full relative pb-2 shadow-lg rounded-lg border border-gray-200">
      {loadingText.length > 0 && (
        <div className="absolute inset-0 flex items-center justify-center flex-col bg-white/50">
          <CircularProgress />
          <span className="text-lg">{loadingText}</span>
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
