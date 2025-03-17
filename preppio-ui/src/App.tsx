import Control from './components/feature/Control';
import Editor from './components/feature/Editor';
import Header from './components/feature/Header';

function App() {

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header />
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
