import React from 'react';
import PasteOnlyTextBox from '../../ui/PasteOnlyTextBox';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { getInputJobDescription, setInputJobDescription } from '../../../store/slices/interviewSlice';

const JobDescription: React.FC = () => {
  const dispatch = useAppDispatch();
  const jobDescriptionContent = useAppSelector(getInputJobDescription);
  const handleJobDescriptionChange = (value: string | React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = typeof value === 'string' ? value : value.target.value;
    dispatch(setInputJobDescription(newValue));
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
