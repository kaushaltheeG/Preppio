import React from 'react';
import { Box, List, ListItem, ListItemButton, ListItemText, Button, CircularProgress, Alert } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import WorkIcon from '@mui/icons-material/Work';
import TuneIcon from '@mui/icons-material/Tune';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import Resume from './../Resume';
import JobDescription from '../JobDescription';
import Tune from '../Tune';
import useUserInputHook from '../../../hooks/useUserInputHook';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { getInputError } from '../../../store/slices/interviewSlice';

interface StatusIndicatorProps {
  isComplete: boolean;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ isComplete }) => {  
  return (
    <Box className="ml-auto">
      {isComplete ? (
        <CheckCircleIcon className="text-green-500" fontSize="small" />
      ) : (
        <RadioButtonUncheckedIcon className="text-gray-300" fontSize="small" />
      )}
    </Box>
  );
};

const UserInputs: React.FC = () => {
  const {
    hasResumeEntered,
    hasJobDescriptionEntered,
    hasRequiredTuneInfo,
    isGeneratingQuestions,
    isGenerateButtonDisabled,
    selectedTab,
    handleGenerate,
    handleResumeTab,
    handleJobDescriptionTab,
    handleTuneTab,
  } = useUserInputHook();

  const error = useAppSelector(getInputError);

  const renderContent = React.useCallback(() => {
    switch (selectedTab) {
      case 0:
        return <Resume />;
      case 1:
        return <JobDescription />;
      case 2:
        return <Tune />;
      default:
        return null;
    }
  }, [selectedTab]);

  return (
    <Box className="flex h-full">
      <div className="flex flex-col justify-between w-64 border-r">
        <div className="h-[90%] p-4">
          <List className="w-full h-full">
            <ListItem disablePadding>
              <ListItemButton 
                selected={selectedTab === 0}
                onClick={handleResumeTab}
              >
                <DescriptionIcon className="mr-3" />
                <ListItemText primary="Resume" />
                <StatusIndicator isComplete={hasResumeEntered} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton 
                selected={selectedTab === 1}
                onClick={handleJobDescriptionTab}
              >
                <WorkIcon className="mr-3" />
                <ListItemText primary="Job Description" />
                <StatusIndicator isComplete={hasJobDescriptionEntered} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton 
                selected={selectedTab === 2}
                onClick={handleTuneTab}
              >
                <TuneIcon className="mr-3" />
                <ListItemText primary="Tune" />
                <StatusIndicator isComplete={hasRequiredTuneInfo} />
              </ListItemButton>
            </ListItem>
          </List>
        </div>

        <div className="flex flex-col p-4 pb-6 gap-3">
          {error && (
            <Alert 
              severity="error" 
              className="text-sm shadow-sm"
              sx={{
                '& .MuiAlert-message': {
                  padding: '2px 0'
                }
              }}
            >
              {error.toString()}
            </Alert>
          )}
          <Button
            onClick={handleGenerate}
            disabled={isGenerateButtonDisabled}
            variant="contained"
            fullWidth
            sx={{
              textTransform: 'none',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              padding: '10px 16px',
              borderRadius: '8px'
            }}
            className="justify-start bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            {isGeneratingQuestions ? (
              <Box className="flex items-center gap-3">
                <CircularProgress size={16} color="inherit" />
                <span>Generating...</span>
              </Box>
            ) : (
              'Generate'
            )}
          </Button>
        </div>
      </div>

      <Box className="flex-1 flex p-4 gap-2 flex-col h-full">
        <Box className="flex-1">
          {renderContent()}
        </Box>
        
      </Box>
    </Box>
  );
};

export default UserInputs;
