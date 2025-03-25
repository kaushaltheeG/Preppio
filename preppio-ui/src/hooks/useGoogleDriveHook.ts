import React from 'react';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { createGoogleDriveDocument } from '../store/slices/googleDriveSlice';

const useGoogleDriveHook = () => {
  const dispatch = useAppDispatch();


  // pass user title
  const handleSaveToGoogleDrive = React.useCallback(() => {
    dispatch(createGoogleDriveDocument({ title: 'Preppio Interview Test 2 via FE' }));
  }, [dispatch]);

  return {
    handleSaveToGoogleDrive,
  }
}

export default useGoogleDriveHook;
