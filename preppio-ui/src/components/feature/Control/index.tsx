import React from "react";
import { setFormState } from "../../../store/slices/appSlice";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
// import { analyzeRequest } from "../../../store/slices/interviewSlice";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { getFormState } from "../../../store/slices/appSlice";
import { Tabs, Tab, Box } from '@mui/material';
import Resume from "../Resume";
import JobDescription from "../JobDescription";
import Tune from "../Tune";
import UserInputs from "./UserInputs";
import Questions from "../Questions";
type FormState = 'questions' | 'userInputs';

const Control: React.FC = () => {
  const dispatch = useAppDispatch();
  const formState = useAppSelector(getFormState);

  const tabStyle = {
    '&.Mui-selected': {
      backgroundColor: '#e8f0fe',
      color: '#1a73e8',
      borderRadius: '4px 4px 0 0'
    },
    '&:hover': {
      backgroundColor: '#f1f3f4',
      borderRadius: '4px 4px 0 0'
    }
  };

  const handleChange = (_event: React.SyntheticEvent, newValue: FormState) => {
    dispatch(setFormState(newValue));
  };

  const renderControlComponent = React.useCallback(() => {
    switch (formState) {
      case 'userInputs':
        return <UserInputs />;
      case 'questions':
        return <Questions />;
      default:
        return null;
    }
  }, [formState]);

  return (
    <div className="flex flex-col h-full">
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={formState} 
          onChange={handleChange}
          aria-label="document type tabs" 
          className="w-full"
        >
          <Tab value="userInputs" label="Inputs" sx={tabStyle} />
          <Tab value="questions" label="Questions" sx={tabStyle} />
        </Tabs>
      </Box>
      {renderControlComponent()}
    </div>
  );
};

export default Control;
