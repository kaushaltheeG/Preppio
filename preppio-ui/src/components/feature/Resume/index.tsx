import React from 'react';
import PasteOnlyTextBox from '../../ui/PasteOnlyTextBox';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { getInputResume, setInputResume } from '../../../store/slices/interviewSlice';
const Resume: React.FC = () => {
  const dispatch = useAppDispatch();
  const resumeContent = useAppSelector(getInputResume);

  const handleResumeChange = (value: string | React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = typeof value === 'string' ? value : value.target.value;
    dispatch(setInputResume(newValue));
  };

  return (
    <div className="flex-1 h-full">
      <PasteOnlyTextBox 
        value={resumeContent} 
        onChange={handleResumeChange}
        className="h-full"
        placeholder="Paste your resume here"
      />
    </div>
  );
};

export default Resume;
