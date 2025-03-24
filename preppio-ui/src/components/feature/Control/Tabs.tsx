import React from 'react';
import { Tabs as MuiTabs, Tab, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { FormState, getOpenTabsArray, setFormState, closeOpenTab } from '../../../store/slices/appSlice';


interface ITabsProps {
  formState: FormState;
}

const Tabs: React.FC<ITabsProps> = ({ formState }) => {
  const openTabs = useAppSelector(getOpenTabsArray);
  const dispatch = useAppDispatch();

  const tabStyle = React.useMemo(() => ({
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
  
  const hanldeCloseTab = React.useCallback((tab: string) => {
    dispatch(closeOpenTab(tab));  
  }, [dispatch]);

  return (
    <MuiTabs 
      value={formState} 
      onChange={handleChange}
      aria-label="document type tabs" 
      className="w-full"
    >
      <Tab value="userInputs" label="Inputs" sx={tabStyle} />
      <Tab value="questions" label="Questions" sx={tabStyle} />
      {openTabs.map((tab) => (
        <Tab
          key={tab}
          value={tab}
          label={
            <div className="flex items-center gap-2">
              <span>{tab}</span>
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  hanldeCloseTab(tab);
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
  );
};

export default Tabs;
