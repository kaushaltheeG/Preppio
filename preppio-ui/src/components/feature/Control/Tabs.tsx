import React from 'react';
import { Tabs as MuiTabs, Tab, IconButton, Tooltip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { FormState, getOpenTabsArray, setFormState, closeOpenTab } from '../../../store/slices/appSlice';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';

interface ITabsProps {
  formState: FormState;
  hasQuestions: boolean;
}

const Tabs: React.FC<ITabsProps> = ({ formState, hasQuestions }) => {
  const openTabs = useAppSelector(getOpenTabsArray);
  const dispatch = useAppDispatch();
  const onQuestionsFormState = React.useMemo(() => formState === 'questions', [formState]);


  const tabStyle = React.useMemo(() => ({
    minHeight: '32px',
    height: '32px',
    '&.Mui-selected': {
      backgroundColor: '#e8f0fe',
      color: '#1a73e8',
      borderRadius: '4px 4px 0 0'
    },
    '&:hover': {
      backgroundColor: '#f1f3f4',
      borderRadius: '4px 4px 0 0'
    }
  }), []);

  const handleChange = React.useCallback((_event: React.SyntheticEvent, newValue: FormState) => {
    dispatch(setFormState(newValue));
  }, [dispatch]);
  
  const hanldeCloseTab = React.useCallback((id: string) => {
    dispatch(closeOpenTab(id));
    dispatch(setFormState('questions'));
  }, [dispatch]);

  return (
    <div className="flex items-center gap-2">
    <MuiTabs 
      value={formState} 
      onChange={handleChange}
      aria-label="document type tabs" 
      className="w-full"
      sx={{
        minHeight: '32px',
        '& .MuiTabs-indicator': {
          height: '2px'
        }
      }}
    >
      <Tab 
        value="userInputs" 
        label={
          <Tooltip title="Inputs for the AI Model" placement="left">
            <div className="flex items-center gap-1">
              <ListAltIcon fontSize="small" />
            </div>
          </Tooltip>
        } 
        sx={tabStyle} 
      />
      <Tab value="questions" label="Questions" sx={tabStyle} />
      {openTabs.map(([id, tab]) => (
        <Tab
          key={id}
          value={tab}
          label={
            <div className="flex items-center gap-2">
              <span>{tab}</span>
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  hanldeCloseTab(id);
                }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </div>
          }
          sx={tabStyle}
        />
      ))}
    </MuiTabs>
    {onQuestionsFormState && hasQuestions && (
        <Tooltip title="Save to your Google Drive" placement="right">
          <IconButton size="medium">
            <DriveFileMoveIcon fontSize="medium" />
          </IconButton>
        </Tooltip>
      )
    }
    </div>
  );
};

export default Tabs;
