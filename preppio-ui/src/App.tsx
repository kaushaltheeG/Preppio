import Control from './components/feature/Control';
import Editor from './components/feature/Editor';

function App() {

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
        <div className="h-full px-8 py-6 flex gap-8">
          <div className="w-56">
            {/* add past history here */}
          </div>
          <div className="w-[55%]">
            <Editor />
          </div>
          <div className="w-[30%]">
            <Control />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
