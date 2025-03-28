import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import React from 'react';
import HistoryIcon from '@mui/icons-material/History';
import Tooltip from '@mui/material/Tooltip';

interface InterviewSession {
  id: string;
  date: string;
  title: string;
  duration: string;
}

const PastSessionSidebar: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  // Mock data - replace with actual data from your backend
  const mockSessions: InterviewSession[] = [
    {
      id: '1',
      date: '2024-03-26',
      title: 'Software Engineer Interview',
      duration: '45 min',
    },
    {
      id: '2',
      date: '2024-03-25',
      title: 'System Design Discussion',
      duration: '60 min',
    },
  ];
  console.log('isOpen', isOpen);
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-12 left-0 h-[calc(100vh-3rem)] bg-white shadow-lg transform transition-all duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0 w-[280px]' : '-translate-x-[calc(280px-64px)] w-16'
        } lg:translate-x-0 lg:static lg:h-full`}
      >
        {isOpen && (
          <div className="h-full flex flex-col">
            <div className="p-4 border-b border-t flex justify-between items-center flex-row">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Past Sessions</h2>
              <IconButton onClick={() => setIsOpen(false)}>
                <ChevronLeftIcon />
              </IconButton>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-4">
                {mockSessions.map((session) => (
                  <div
                    key={session.id}
                    className="p-3 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                  >
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">{session.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{session.date}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{session.duration}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {!isOpen && (
          <div className="flex flex-col flex-1 h-full">
            <Tooltip title="View Past Sessions">
              <IconButton onClick={() => setIsOpen(true)}>
                <HistoryIcon />
              </IconButton>
            </Tooltip>
          </div>
        )}
      </div>
    </>
  );
};

export default PastSessionSidebar; 