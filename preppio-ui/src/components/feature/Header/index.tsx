import React from 'react';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector';
import {
  checkSession,
  subscribeToAuthChanges,
  unsubscribeFromAuthChanges,
} from '../../../store/slices/authSlice';
import { hasSessionSelector, getLoggedInUser } from '../../../store/slices/authSlice';
import GoogleLogin from './GoogleLogin';
import UserProfile from './UserProfile';

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const hasSession = useAppSelector(hasSessionSelector);
  const loggedInUser = useAppSelector(getLoggedInUser);
  const firstName: string = React.useMemo(() => loggedInUser?.user_metadata.full_name?.split(' ')[0] || '', [loggedInUser]);

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
    <header className="h-12 bg-white shadow-md flex items-center justify-between px-8 z-10">
      <div className="text-2xl font-bold text-gray-800 pb-1">
        Preppio
        <div className="text-sm text-gray-500">
          {loggedInUser ? `Let's get prepped for your upcoming interview, ${firstName}!` : 'Get Prepped for Your Upcoming Interview'}
        </div>
      </div>
      {renderLogin()}
    </header>
  );
};

export default Header;
