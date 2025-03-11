import Control from './components/feature/Control';
import Tune from './components/feature/Tune';
import { useAppSelector } from './hooks/useAppSelector';
import { onJobDescription, onResume, onQuestions } from './store/slices/appSlice';
import Resume from './components/feature/Resume';
import JobDescription from './components/feature/JobDescription';
import Questions from './components/feature/Questions';

function App() {
  const isOnJobDescription = useAppSelector(onJobDescription);
  const isOnResume = useAppSelector(onResume);
  const isOnQuestions = useAppSelector(onQuestions);

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
        <div className="h-full min-w-7xl px-8 py-6 flex gap-8">
          <div className="w-56">
            <Control />
          </div>
          {/* add Resume and JobDescription here */}
          {isOnResume && <Resume />}
          {isOnJobDescription &&
            <JobDescription />
          }
          {isOnQuestions && <Questions />}
          <div className="w-[30%]">
            <Tune />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
