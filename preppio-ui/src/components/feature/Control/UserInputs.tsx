import React from 'react';
import { Box, List, ListItem, ListItemButton, ListItemText, Button, CircularProgress } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import WorkIcon from '@mui/icons-material/Work';
import TuneIcon from '@mui/icons-material/Tune';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import Resume from './../Resume';
import JobDescription from '../JobDescription';
import Tune from '../Tune';
import useUserInputHook from '../../../hooks/useUserInputHook';

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
      <List className="w-64 border-r h-[90%]">
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

      <Box className="flex-1 flex p-4 gap-2 flex-col h-full">
        <Box className="flex-1">
          {renderContent()}
        </Box>
        <Button 
          variant="contained" 
          fullWidth
          size="large"
          onClick={handleGenerate}
          disabled={isGenerateButtonDisabled}
        >
          {isGeneratingQuestions ? (
            <Box className="flex items-center gap-2">
              <CircularProgress size={20} color="inherit" />
              <span>Generating...</span>
            </Box>
          ) : (
            'Generate Potential Questions'
          )}
        </Button>
      </Box>
    </Box>
  );
};

export default UserInputs;
