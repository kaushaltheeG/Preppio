import React from 'react';
import { Tabs as MuiTabs, Tab, IconButton, Tooltip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ListAltIcon from '@mui/icons-material/ListAlt';
import SaveToGoogleDriveButton from '../GoogleDrive/SaveButton';
import useGoogleDriveHook from '../../../hooks/useGoogleDriveHook';
import useTabsHook from '../../../hooks/useTabsHook';
import { FormState } from '../../../store/slices/appSlice';
import OpenFileButton from '../GoogleDrive/OpenFileButton';

interface ITabsProps {
  formState: FormState;
  hasQuestions: boolean;
  orientation?: 'vertical' | 'horizontal';
}

const Tabs: React.FC<ITabsProps> = ({ formState, hasQuestions, orientation = 'horizontal' }) => {
  const { handleSaveToGoogleDrive, getCreatedDocumentUrl, isCreatingGoogleDriveDocument } = useGoogleDriveHook();
  const { handleTabChange, hanldeCloseTab, tabStyle, openTabs, onQuestionsFormState, onIframeFormState } = useTabsHook(formState);

  return (
    <div className={`flex items-center gap-2 space-between ${formState === 'iframe' ? 'flex-col h-full' : 'flex-row w-full'}`}>
      <MuiTabs 
        value={formState} 
        onChange={handleTabChange}
        aria-label="document type tabs" 
        className="w-full"
        orientation={orientation}
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
                <span>{id}</span>
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
        <SaveToGoogleDriveButton handleSaveToGoogleDrive={handleSaveToGoogleDrive} isLoading={isCreatingGoogleDriveDocument} tooltipTitle="Download as TXT file" />
      )}
      {onIframeFormState && (
        <OpenFileButton url={getCreatedDocumentUrl} />
      )}
    </div>
  );
};

export default Tabs;
