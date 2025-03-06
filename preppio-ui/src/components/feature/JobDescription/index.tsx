import React from 'react';
import PasteOnlyTextBox from '../../ui/PasteOnlyTextBox';

const JobDescription: React.FC = () => {
  const [jobDescription, setJobDescription] = React.useState('');

  return (
    <div className="flex-1">
      <PasteOnlyTextBox value={jobDescription} onChange={setJobDescription} className="h-full" />
    </div>
  );
};

export default JobDescription;
