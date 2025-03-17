import React from 'react';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector';
import {
  checkSession,
  subscribeToAuthChanges,
  unsubscribeFromAuthChanges,
} from '../../../store/slices/authSlice';
import { hasSessionSelector } from '../../../store/slices/authSlice';
import GoogleLogin from './GoogleLogin';

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const hasSession = useAppSelector(hasSessionSelector);

  const renderLogin = React.useCallback(() => {
    if (!hasSession) {
      return <GoogleLogin />;
    }
    return (
      <div>Logged In</div>
    );
  }, [hasSession]);

  React.useEffect(() => {
    dispatch(checkSession());
    dispatch(subscribeToAuthChanges());

    return () => {
      dispatch(unsubscribeFromAuthChanges());
    };
  }, [dispatch]);

  return (
    <header className="h-12 bg-white shadow-md flex items-center justify-between px-8 z-10">
      <div className="text-2xl font-bold text-gray-800">
        Preppio
        <div className="text-sm text-gray-500">
          Get Prepped for Your Upcoming Interview
        </div>
      </div>
      {renderLogin()}
    </header>
  );
};

export default Header;
