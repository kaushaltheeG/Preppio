import React from 'react';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { createGoogleDriveDocument, getGoogleDocUrl, isCreatingGoogleDriveDocumentSelector } from '../store/slices/googleDriveSlice';
import { useAppSelector } from './useAppSelector';

const useGoogleDriveHook = () => {
  const dispatch = useAppDispatch();
  const getCreatedDocumentUrl = useAppSelector(getGoogleDocUrl);
  const isCreatingGoogleDriveDocument = useAppSelector(isCreatingGoogleDriveDocumentSelector);
    const hadDocumentUrl = React.useMemo(() => getCreatedDocumentUrl.length > 0, [getCreatedDocumentUrl]);

  const handleSaveToGoogleDrive = React.useCallback((title: string) => {
    dispatch(createGoogleDriveDocument({ title }));
  }, [dispatch]);

  return {
    handleSaveToGoogleDrive,
    getCreatedDocumentUrl,
    hadDocumentUrl,
    isCreatingGoogleDriveDocument,
  }
}

export default useGoogleDriveHook;
