import React from 'react';
import { Modal, Box } from '@mui/material';

interface SharedModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children?: React.ReactNode;
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '12px',
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.15)',
  pt: 3,
  px: 4,
  pb: 4,
  outline: 'none',
  maxWidth: '90vw',
  maxHeight: '90vh',
  overflow: 'auto',
  '& #modal-title': {
    fontSize: '1.5rem',
    fontWeight: 600,
    color: 'text.primary',
    marginBottom: '0.5rem',
    marginTop: 0,
  },
  '& #modal-description': {
    fontSize: '1rem',
    color: 'text.secondary',
    marginBottom: '1.5rem',
    lineHeight: 1.5,
  },
  '@media (max-width: 600px)': {
    width: '95%',
    px: 2,
    pt: 2,
    pb: 3,
  }
};

const SharedModal: React.FC<SharedModalProps> = ({
  open,
  onClose,
  title,
  description,
  children
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      sx={{
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(4px)',
      }}
    >
      <Box sx={style}>
        <h2 id="modal-title">{title}</h2>
        {description && (
          <p id="modal-description">{description}</p>
        )}
        {children}
      </Box>
    </Modal>
  );
};

export default SharedModal;