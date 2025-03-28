import Control from './components/feature/Control';
import Header from './components/feature/Header';
import React from 'react';
import PastSessionSidebar from './components/feature/PastSessionSidebar';

function App() {
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
    </div>
  );
}

export default App;
