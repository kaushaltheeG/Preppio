import React from 'react';
import PasteOnlyTextBox from '../../ui/PasteOnlyTextBox';
import { setJobDescription } from '../../../store/slices/jobDescriptionSlice';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector';

const JobDescription: React.FC = () => {
  const dispatch = useAppDispatch();
  const { content: jobDescriptionContent } = useAppSelector((state) => state.jobDescription);
  const handleJobDescriptionChange = (value: string | React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = typeof value === 'string' ? value : value.target.value;
    dispatch(setJobDescription(newValue));
  };

  return (
    <div className="flex-1 h-full">
      <PasteOnlyTextBox
        value={jobDescriptionContent}
        onChange={handleJobDescriptionChange}
        className="h-full"
        placeholder="Paste the job description here"
      />
    </div>
  );
};

export default JobDescription;
