import React from 'react';
import PasteOnlyTextBox from '../../ui/PasteOnlyTextBox';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector'; 
import { setResume } from '../../../store/slices/resumeSlice';

const Resume: React.FC = () => {
  const dispatch = useAppDispatch();
  const { content: resumeContent } = useAppSelector((state) => state.resume);

  const handleResumeChange = (value: string | React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = typeof value === 'string' ? value : value.target.value;
    dispatch(setResume(newValue));
  };

  return (
    <div className="flex-1">
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
