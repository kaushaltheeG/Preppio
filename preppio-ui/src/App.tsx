import React from 'react';
import TextBox from './components/TextBox';

function App() {
  const [jobDescription, setJobDescription] = React.useState('');

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-400">
      <div className="flex flex-row justify-between w-full max-w-6xl gap-8 h-full">
        <TextBox 
          value={jobDescription}
          onChange={setJobDescription}
          placeholder="Enter the job description" 
          className="flex-1 min-h-[200px]"
        />
        <div className="w-px bg-gray-200 h-auto self-stretch border-r-2 border-gray-200" />
        <TextBox 
          value="" 
          placeholder="Potential Questions..." 
          className="flex-1 min-h-[200px]"
        />
      </div>
    </div>
  );
}

export default App;
