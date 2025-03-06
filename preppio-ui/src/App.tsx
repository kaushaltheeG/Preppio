import React from 'react';
import PasteOnlyTextBox from './components/ui/PasteOnlyTextBox';
import Control from './components/feature/Control';
import Tune from './components/feature/Tune';

function App() {
  const [jobDescription, setJobDescription] = React.useState('');

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <header className="h-12 bg-white shadow-md flex items-center justify-between px-8 z-10">
        <div className="text-2xl font-bold text-gray-800">
          Preppio
        </div>
        <div className="text-sm text-gray-500">
          Generate interview questions from a job description
        </div>
      </header>
      <main className="flex-1 bg-gray-100">
        <div className="h-full max-w-7xl mx-auto px-8 py-6 flex gap-8">
          <div className="w-56">
            <Control />
          </div>
          {/* add Resume and JobDescription here */}
          <div className="w-85">
            <Tune />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
