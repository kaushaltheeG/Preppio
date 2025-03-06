import React from 'react';
import PasteOnlyTextBox from '../../ui/PasteOnlyTextBox';

const Resume: React.FC = () => {
  const [resume, setResume] = React.useState('');

  return (
    <div className="flex-1">
      <PasteOnlyTextBox 
        value={resume} 
        onChange={setResume}
        className="h-full"
      />
    </div>
  );
};

export default Resume;
