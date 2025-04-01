import Control from './components/feature/Control';
import Header from './components/feature/Header';
import PastSessionSidebar from './components/feature/PastSessionSidebar';
import SharedModal from './components/ui/SharedModal';
import useViewPortHook from './hooks/useViewPortHook';

function App() {
  const { isMobileView } = useViewPortHook();

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header />
      <div className="flex-1 flex overflow-hidden">
      <PastSessionSidebar />
      <main className="flex-1 bg-gray-100 overflow-y-auto">
        <div className="h-full px-2 py-2">
          <Control />
        </div>
      </main>
    </div>

    <SharedModal
      open={isMobileView}
      onClose={() => {}} // Empty function since we don't want to allow closing on mobile
      title="Mobile View Not Supported :("
        description="We're currently working on making Preppio fully responsive for mobile devices. Please use a desktop browser for the best experience."
      />
    </div>
  );
}

export default App;
