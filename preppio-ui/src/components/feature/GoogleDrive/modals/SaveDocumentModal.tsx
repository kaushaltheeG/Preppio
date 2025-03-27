import React from 'react';
import { Box } from '@mui/material';
import SharedModal from '../../../../components/ui/SharedModal';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import { Typography, Button, Input } from '@mui/material';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { setFormState } from '../../../../store/slices/appSlice';

interface SaveDocumentModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (title: string) => void;
  documentName: string;
  setDocumentName: (title: string) => void;
}

const SaveDocumentModal: React.FC<SaveDocumentModalProps> = ({
  open,
  onClose,
  onSave,
  documentName,
  setDocumentName,
}) => {
  const dispatch = useAppDispatch();
  const handleSave = React.useCallback(() => {
    onSave(documentName);
    onClose();
    dispatch(setFormState('iframe'));
  }, [onSave, documentName, onClose, dispatch]);

  return (
    <SharedModal
      open={open}
      onClose={onClose}
      title=""
      description=""
    >
      <Box sx={{ position: 'relative' }}>
        
        <Box className="flex flex-col gap-4">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <DriveFileMoveIcon 
              sx={{ 
                fontSize: '32px',
                color: '#4285F4'
              }} 
            />
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Save to Your Google Drive
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Enter a name for your document
              </Typography>
            </Box>
          </Box>

          <Box className="flex flex-col gap-2">
            <Input
              fullWidth
              placeholder="Document name"
              value={documentName}
              onChange={(e) => setDocumentName(e.target.value)}
              sx={{
                padding: '8px 12px',
                '&::placeholder': {
                  color: 'text.secondary',
                }
              }}
            />
          </Box>

          <Box className="flex justify-end gap-2">
            <Button 
              onClick={onClose}
              variant="outlined"
              sx={{ minWidth: '100px' }}
              disabled={Boolean(!documentName.trim().length)}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSave}
              variant="contained"
              disabled={Boolean(!documentName.trim().length)}
              sx={{ 
                minWidth: '100px',
                bgcolor: '#4285F4',
                '&:hover': {
                  bgcolor: '#3367D6'
                }
              }}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Box>
    </SharedModal>
  );
};

export default SaveDocumentModal;

