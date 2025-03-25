import React from 'react';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { createGoogleDriveDocument, getGoogleDocUrl } from '../store/slices/googleDriveSlice';
import { useAppSelector } from './useAppSelector';

const useGoogleDriveHook = () => {
  const dispatch = useAppDispatch();
  const getCreatedDocumentUrl = useAppSelector(getGoogleDocUrl);
  const hadDocumentUrl = React.useMemo(() => getCreatedDocumentUrl.length > 0, [getCreatedDocumentUrl]);
  // pass user title
  const handleSaveToGoogleDrive = React.useCallback(() => {
    dispatch(createGoogleDriveDocument({ title: 'Preppio Interview Test 2 iFrame' }));
  }, [dispatch]);

  return {
    handleSaveToGoogleDrive,
    getCreatedDocumentUrl,
    hadDocumentUrl,
  }
}

export default useGoogleDriveHook;
