import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import React from 'react';
import HistoryIcon from '@mui/icons-material/History';
import Tooltip from '@mui/material/Tooltip';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { fetchInterviewSession, getInterviewSessions, getActiveInterviewSessionId } from '../../../store/slices/interviewSlice';
import { NewSessionButton, NewSessionIconButton, useNewSessionButtonHook } from './NewSessionButton';
import { setFormState } from '../../../store/slices/appSlice';
const PastSessionSidebar: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const pastSessions = useAppSelector((getInterviewSessions));
  const dispatch = useAppDispatch();
  const { onClick: onClickNewSession } = useNewSessionButtonHook();
  const activeSessionId = useAppSelector(getActiveInterviewSessionId);
  
  const handleSessionClick = React.useCallback((interviewSessionId: string) => {
    dispatch(fetchInterviewSession({ interviewSessionId }));
    dispatch(setFormState('questions'));
  }, [dispatch]);

  const renderPastSessions = React.useCallback(() => {
    return pastSessions.map((session) => (
      <Tooltip title={`${session.jobTitle} interview at ${session.company} with ${session.interviewerPosition}`} placement='right'>
        <div
          key={session.id}
          className={`p-3 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors ${session.id === activeSessionId ? 'bg-gray-100' : ''}`}
          onClick={() => handleSessionClick(session.id)}
        >
          <h3 className="font-medium text-gray-900 dark:text-gray-100">{session.company}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">{session.jobTitle}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{new Date(session.updatedAt).toLocaleDateString()}</p>
        </div>
      </Tooltip>
    ));
  }, [pastSessions, handleSessionClick, activeSessionId]);

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
              <div className="flex flex-row">
                <IconButton onClick={() => setIsOpen(false)}>
                  <ChevronLeftIcon />
                </IconButton>
              </div>
            </div>
            <div className="flex flex-row justify-center items-center py-2 px-4">
              <NewSessionButton onClick={onClickNewSession} />
            </div>
            <div className="flex-1 overflow-y-auto justify-center items-center p-4">
              <div className="space-y-4">
                {renderPastSessions()}
              </div>
            </div>
          </div>
        )}
        {!isOpen && (
          <div className="flex flex-col flex-1 h-full">
            <NewSessionIconButton onClick={onClickNewSession} />
            <Tooltip title="View Past Sessions" placement="right">
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