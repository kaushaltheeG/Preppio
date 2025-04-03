import { Tooltip } from '@mui/material';
import React from 'react';
import IconButton from '@mui/material/IconButton';  
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import SaveDocumentModal from './modals/SaveDocumentModal';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { gainGoogleDrivePermission } from '../../../store/slices/googleDriveSlice';
interface SaveButtonProps {
  handleSaveToGoogleDrive: (title: string) => void;
  isLoading: boolean;
  fontSize?: 'small' | 'medium' | 'large';
  tooltipTitle?: string;
  tooltipPlacement?: 'top' | 'right' | 'bottom' | 'left';
}

const SaveButton: React.FC<SaveButtonProps> = ({
  handleSaveToGoogleDrive,
  isLoading,
  fontSize = 'medium',
  tooltipTitle = 'Save to your Google Drive',
  tooltipPlacement = 'right'
}) => {
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [documentName, setDocumentName] = React.useState('');
  const handleOpenModal = React.useCallback(() => {
    dispatch(gainGoogleDrivePermission());
    setIsModalOpen(true);
  }, [dispatch]);

  const handleCloseModal = React.useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleSave = React.useCallback(() => {
    handleSaveToGoogleDrive(documentName);
    handleCloseModal();
  }, [handleSaveToGoogleDrive, documentName, handleCloseModal]);

  return (
    <>
      <Tooltip title={tooltipTitle} placement={tooltipPlacement}>
        <IconButton size={fontSize} onClick={handleOpenModal}>
          <DriveFileMoveIcon fontSize={fontSize} />
        </IconButton>
      </Tooltip>
      
      <SaveDocumentModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSave}
        documentName={documentName}
        setDocumentName={setDocumentName}
      />
    </>
  );
};

export default SaveButton;
