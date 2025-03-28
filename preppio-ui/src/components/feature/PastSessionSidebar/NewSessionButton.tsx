import React from 'react';
import IconButton from '@mui/material/IconButton';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { setNewInterviewSession } from '../../../store/slices/interviewSlice';
import { setJobDescriptionInitialState } from '../../../store/slices/jobDescriptionSlice';
import { setTuneInitialState } from '../../../store/slices/tuneSlice';
import { setFormState } from '../../../store/slices/appSlice';

interface NewSessionButtonProps {
  onClick: () => void;
}

const useNewSessionButtonHook = () => {
  const dispatch = useAppDispatch();
  const onClick = () => {
    dispatch(setNewInterviewSession());
    dispatch(setJobDescriptionInitialState());
    dispatch(setTuneInitialState());
    dispatch(setFormState('userInputs'));
  };

  return {
    onClick,
  };
};

const NewSessionIconButton: React.FC<NewSessionButtonProps> = ({ onClick }) => {
  return (
    <Tooltip title="New Session" placement="right">
      <IconButton onClick={onClick} size="large">
        <NoteAddIcon />
      </IconButton>
    </Tooltip>
  );
};

const NewSessionButton: React.FC<NewSessionButtonProps> = ({ onClick }) => {
  return (
    <Button
      onClick={onClick}
      variant="outlined"
      startIcon={<AddIcon />}
      sx={{
        borderRadius: '20px',
        textTransform: 'none',
        px: 3,
        py: 1,
        borderStyle: 'dashed',
        borderWidth: '1px',
        borderColor: '#4285F4',
        color: '#4285F4',
        '&:hover': {
          borderColor: '#3367D6',
          color: '#3367D6',
          bgcolor: 'transparent'
        }
      }}
    >
      Create New Session
    </Button>
  );
};

export { NewSessionIconButton, NewSessionButton, useNewSessionButtonHook };

