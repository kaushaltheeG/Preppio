import React from 'react';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector';
import {
  checkSession,
  subscribeToAuthChanges,
  unsubscribeFromAuthChanges,
} from '../../../store/slices/authSlice';
import { hasSessionSelector, getLoggedInUser } from '../../../store/slices/authSlice';
import GoogleLogin from '../../Google/GoogleLogin';
import UserProfile from './UserProfile';
import { getCompanyName } from '../../../store/slices/interviewSlice';


const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const hasSession = useAppSelector(hasSessionSelector);
  const loggedInUser = useAppSelector(getLoggedInUser);
  const companyName = useAppSelector(getCompanyName);
  const firstName: string = React.useMemo(() => loggedInUser?.user_metadata.full_name?.split(' ')[0] || '', [loggedInUser]);

  const renderSubText = React.useMemo(() => {
    if (hasSession && loggedInUser && companyName) {
      return (
        <>
          Let's get prepped for your upcoming interview at{' '}
          <span className="text-blue-600">{companyName}</span>,{' '}
          <span className="text-blue-500">{firstName}</span>!
        </>
      );
    }
    if (hasSession && loggedInUser) {
      return (
        <>
          Let's get prepped for your upcoming interview,{' '}
          <span className="text-blue-500">{firstName}</span>!
        </>
      );
    }
    return 'Get Prepped for Your Upcoming Interview';
  }, [hasSession, loggedInUser, firstName, companyName]);

  const renderLogin = React.useCallback(() => {
    if (!hasSession || !loggedInUser) {
      return <GoogleLogin />;
    }
    return (
      <UserProfile loggedInUser={loggedInUser} />
    );
  }, [hasSession, loggedInUser]);

  React.useEffect(() => {
    dispatch(checkSession());
    dispatch(subscribeToAuthChanges());

    return () => {
      dispatch(unsubscribeFromAuthChanges());
    };
  }, [dispatch]);

  return (
    <>
      <header className="h-12 bg-white shadow-md flex items-center justify-between pr-8 pl-4 z-10">
        <div className="flex items-center gap-4">
          <div className="text-2xl font-bold text-gray-800 pb-1">
            Preppio
            <div className="text-sm text-gray-500">
              {renderSubText}
            </div>
          </div>
        </div>
        {renderLogin()}
      </header>
    </>
  );
};

export default Header;
