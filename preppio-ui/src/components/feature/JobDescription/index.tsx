import React from 'react';
import PasteOnlyTextBox from '../../ui/PasteOnlyTextBox';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setJobDescription } from '../../../store/jobDescriptionSlice';

const JobDescription: React.FC = () => {
  const dispatch = useAppDispatch();
  const { content: jobDescriptionContent } = useAppSelector((state) => state.jobDescription);
  const handleJobDescriptionChange = (value: string | React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = typeof value === 'string' ? value : value.target.value;
    dispatch(setJobDescription(newValue));
  };

  return (
    <div className="flex-1">
      <PasteOnlyTextBox value={jobDescriptionContent} onChange={handleJobDescriptionChange} className="h-full" />
    </div>
  );
};

export default JobDescription;
