import React from 'react';
import TextBox from './components/TextBox';
import Button from './components/Button';
function App() {
  const [jobDescription, setJobDescription] = React.useState('');

  return (
    <>
    <header className="h-8 bg-white shadow-md flex items-center justify-between px-8 fixed w-full top-0">
      <div className="text-2xl font-bold text-gray-800">
        Preppio
      </div>
      <div className="text-sm text-gray-500">
        Generate interview questions from a job description
      </div>
    </header>
    <div className="h-screen flex items-center justify-center p-4 bg-gray-400">
      <div className="flex flex-row justify-between w-full max-w-6xl gap-8 h-[90vh]">
        <div className="flex flex-col flex-1">
          <TextBox 
            value={jobDescription}
            onChange={setJobDescription}
            placeholder="Enter the job description" 
            className="flex-1 min-h-[200px]"
            />
          <Button variant="primary" size="lg" onClick={() => {}}>Generate Questions</Button>
        </div>
        <div className="w-px bg-gray-200 h-auto self-stretch border-r-2 border-gray-200" />
        <div className="flex flex-col flex-1">
          <TextBox 
            value="" 
            placeholder="Potential Questions..." 
            className="flex-1 min-h-[200px]"
            />
          <Button variant="primary" size="lg" onClick={() => {}}>Download Questions</Button>

        </div>
      </div>
    </div>
    </>
  );
}

export default App;
