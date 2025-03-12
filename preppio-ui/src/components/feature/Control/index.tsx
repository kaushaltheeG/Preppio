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

type FormState = 'jobDescription' | 'resume' | 'tune';

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
      case 'resume':
        return <Resume />;
      case 'jobDescription':
        return <JobDescription />;
      case 'tune':
        return <Tune />;
      default:
        return null;
    }
  }, [formState]);

  return (
    <div className="flex flex-col gap-2 h-[60%]">
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={formState} 
          onChange={handleChange}
          aria-label="document type tabs"
        >
          <Tab value="resume" label="Resume" sx={tabStyle} />
          <Tab value="jobDescription" label="Job Description" sx={tabStyle} />
          <Tab value="tune" label="Generate" sx={tabStyle} />
        </Tabs>
      </Box>
      {renderControlComponent()}
    </div>
  );
};

export default Control;
